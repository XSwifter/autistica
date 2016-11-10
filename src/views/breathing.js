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

    static inhaleValue = 'Inhale';
    static exhaleValue = 'Exhale';

    constructor(props) {

        super(props);
        this.state = {
            loaded: false,
        }

    }

    componentWillMount() {

        this.setState({
            loaded: true,
            bounceValue: new Animated.Value(0),
            radius: (Dimensions.get("window").width > Dimensions.get("window").height ? Dimensions.get("window").height : Dimensions.get("window").width) - 200,
            minRadiusValue: 60,
            headerValue: breathing.inhaleValue
        });
    }

    render() {
        return (

            <View style={styles.container}>
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
                <Text style={{textAlign: 'center', fontSize: 30, flex:1}} >{this.state.headerValue}</Text>

                <Button
                    text="Go back"
                    style={{flex : 1}}
                    onpress={this.goBackToAccount.bind(this)}
                    button_styles={styles.primary_button}
                    button_text_styles={[styles.primary_button_text, {textAlign : 'center'}]}/>

            </View>


        );
    }

    componentDidMount() {
        this.state.bounceValue.setValue(this.state.minRadiusValue);
        this.inhale();
    }

    goBackToAccount() {
        this.props.navigator.pop({});
    }

    inhale() {
        Animated.timing(this.state.bounceValue, {
                toValue: this.state.radius,
                duration: 4000
            }
        )
            .start(() => {
                this.setState({
                    headerValue : breathing.exhaleValue
                });
                this.exhale()
            });
    };


    exhale() {
        Animated.timing(this.state.bounceValue, {
            toValue: this.state.minRadiusValue,
            duration: 4000
        }).
        start(() => {
            this.inhale()
            this.setState(
                {
                    headerValue : breathing.inhaleValue
                }
            );
        });
    };

    /*
     Animated.timing(this.state.headerValue, {
     toValue: this.state.headerValue == breathing.inhaleValue ? breathing.exhaleValue : breathing.inhaleValue,
     duration: 0*/
}



