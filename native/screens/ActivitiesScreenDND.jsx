import React, { Component } from "react";
import { Text, View, StyleSheet, SectionList, PanResponder, Animated } from "react-native";
import H1WithButton from "../components/misc/H1WithButton";
import { GREEN, RED } from "../colors";

function immutableMove(arr, from, to) {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

class ActivitiesScreen extends Component {
  state = {
    sections: [
      {
        title: "Main dishes",
        data: [{ title: "Water" }, { title: "Coke" }, { title: "Beer" }],
      },
      {
        title: "Sides",
        data: [{ title: "French Fries" }, { title: "Onion Rings" }, { title: "Fried Shrimps" }],
      },
      {
        title: "Drinks",
        data: [{ title: "Water" }, { title: "Coke" }, { title: "Beer" }],
      },
      {
        title: "Desserts",
        data: [{ title: "Cheese Cake" }, { title: "Ice Cream" }],
      },
    ],
    dragging: false,
    draggingSectionIdx: -1,
    draggingItemIdx: -1,
  };

  point = new Animated.ValueXY(); // current position of person's finger
  scrollOffset = 0; // current scroll position
  flatlistTopOffset = 0;
  rowHeight = 0; // height of the item
  currentItemIdx = -1;
  listHeaderComponentHeight = 0;

  addAbsIndexesToData = () => {
    let idx = 1;
    let sections = this.state.sections;
    for (let s = 0; s < sections.length; s++) {
      for (let i = 0; i < sections[s].data.length; i++) {
        sections[s].data[i].absIndex = idx++;
      }
    }
  };

  constructor(props) {
    super(props);
    this.addAbsIndexesToData();

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.currentIdx = this.yToIndex(gestureState.y0);
        this.setState({
          dragging: true, // FIXME: non necessario secondo me
          draggingIdx: this.currentIdx,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{ y: this.point.y }])({
          y: gestureState.moveY - this.listHeaderComponentHeight - this.flatlistTopOffset - 20,
        });
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.reset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.reset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  yToIndex = y => {
    const value = Math.floor(
      (this.scrollOffset + y - this.listHeaderComponentHeight - this.flatlistTopOffset) / this.rowHeight
    );

    if (value < 0) return 0;
    let length = 0;
    this.state.sections.forEach(s => s.data.forEach(d => length++));
    if (value > length) return length - 1;

    return value;
  };

  reset = () => {
    this.setState({ dragging: false, draggingIdx: -1 });
  };

  getItemFromSectionsByIdx = () => {
    const { sections, draggingIdx } = this.state;
    for (let s = 0; s < sections.length; s++) {
      for (let i = 0; i < sections[s].data.length; i++) {
        const data = sections[s].data[i];
        if (data.absIndex === draggingIdx) return data;
      }
    }
  };

  render() {
    const { sections, dragging, draggingIdx } = this.state;

    const renderItem = ({ item }) => (
      <View
        onLayout={e => (this.rowHeight = e.nativeEvent.layout.height)}
        style={{
          padding: 16,
          flexDirection: "row",
          opacity: item.absIndex === draggingIdx ? 0 : 1,
        }}
      >
        <View {...this._panResponder.panHandlers}>
          <Text style={{ fontSize: 20 }}>||||||</Text>
        </View>
        <Text style={{ fontSize: 20, textAlign: "center", flex: 1 }}>{item.title}</Text>
      </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
      <View style={{ paddingHorizontal: 16, backgroundColor: "#aaa", height: 0 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Text>
      </View>
    );

    const renderListHeaderComponent = () => (
      <View onLayout={e => (this.listHeaderComponentHeight = e.nativeEvent.layout.height)}>
        <H1WithButton text="Attività" />
      </View>
    );

    return (
      <View style={styles.container}>
        {dragging && (
          <Animated.View
            style={{
              backgroundColor: RED,
              position: "absolute",
              zIndex: 999,
              width: "100%",
              top: this.point.getLayout().top,
            }}
          >
            {renderItem({ item: this.getItemFromSectionsByIdx() })}
          </Animated.View>
        )}
        <SectionList
          scrollEnabled={!dragging}
          ListHeaderComponent={renderListHeaderComponent}
          renderSectionHeader={renderSectionHeader}
          sections={sections}
          renderItem={renderItem}
          keyExtractor={item => String(item.absIndex)}
          style={{ width: "100%" }}
          onScroll={e => (this.scrollOffset = e.nativeEvent.contentOffset.y)}
          onLayout={e => (this.flatlistTopOffset = e.nativeEvent.layout.y)}
        />
      </View>
    );
  }
}

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
