/**
 * Created by Vladimir on 11/9/2016.
 */
'use strict';

import  {
    View,
    Text,
    Animated
} from 'react-native';

import React, {Component} from 'react';

import styles from '../styles/common-styles.js';

import Button from '../components/button';
import Header from '../components/header';

import Dimensions from 'Dimensions';

export default class breathing extends Component {

    constructor(props) {

        super(props);
        this.state = {
            loaded: false,
            bounceValue: new Animated.Value(0),
            radius: 0
        }

    }

    componentWillMount() {

        this.setState({
            loaded: true,
            bounceValue: new Animated.Value(0),
            radius: (Dimensions.get("window").width > Dimensions.get("window").height ? Dimensions.get("window").height : Dimensions.get("window").width) - 10,
            minRadiusValue: 0
        });
    }

    render() {
        return (

            <View style={styles.container}>
                <Header text="Breathing module" loaded={this.state.loaded}/>
                <View style={[styles.body,
                    {
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }]}>
                    <Animated.Text style={[
                        styles.circle, {
                            width: this.state.bounceValue,
                            height: this.state.bounceValue,
                            borderRadius: this.state.bounceValue
                        }

                    ]}/>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        text="Go back"
                        onpress={this.goBackToAccount.bind(this)}
                        button_styles={styles.primary_button}
                        button_text_styles={styles.primary_button_text}/>
                </View>
            </View>


        );
    }

    componentDidMount() {
        this.state.bounceValue.setValue(this.state.minRadiusValue);
        this.animateRepetitiveCircle();
    }

    goBackToAccount() {
        this.props.navigator.pop({});
    }

    animateRepetitiveCircle() {
        Animated.sequence([
            Animated.timing(this.state.bounceValue, {
                toValue: this.state.radius,
                duration: 6000
            }),
            Animated.timing(this.state.bounceValue, {
                toValue: this.state.minRadiusValue,
                duration: 6000
            })
        ]).start(() => {
            this.animateRepetitiveCircle()
        });
    };

}
