import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    PanResponder,
    Animated
} from 'react-native';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1)
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});

                Animated.spring(
                    this.state.scale,
                    { toValue: 3, friction: 3 }
                ).start();
            },

            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y}
            ]),

            onPanResponderRelease: (e, {vx, vy}) => {
                this.state.pan.flattenOffset();

                Animated.spring(
                    this.state.scale,
                    { toValue: 1, friction: 3 }
                ).start();
            }
        });
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            },
            box: {
                width: 50,
                height: 50,
                backgroundColor: 'yellow',
                borderRadius: 50
            },
            image: {
                transform: [{translateX}, {translateY}, {rotate}, {scale}]
            }
        });

        let { pan, scale } = this.state;
        let [translateX, translateY] = [pan.x, pan.y];
        let rotate = '0deg';
        let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

        return (
            <View style={styles.container}>
                <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
                    <View style={styles.box}></View>
                </Animated.View>
            </View>
        );
    }
}

AppRegistry.registerComponent('panresponder_demo', () => App);
