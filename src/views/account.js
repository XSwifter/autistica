'use strict';
import  {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import React, { Component } from 'react';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';
import Breathing from './breathing';

import styles from '../styles/common-styles.js';

import app from '../config/config.js' 

export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
        loaded: true
      });
    });

  }

  render(){

    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />  
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user.email}</Text>
              </View>
              <Image
                style={styles.image}
                source={{uri: this.state.user.photoURL}}
              />
              <Button
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
             <Button
                  text="Breathing"
                  onpress={this.goToBreathing.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
            </View>
        }
        </View>
      </View>
    );
  }

  logout(){

    AsyncStorage.removeItem('user_data').then(() => {    
      app.auth().signOut();
      this.props.navigator.push({
        component: Login
      });
    });

  }

  goToBreathing(){
    this.props.navigator.push({
      component: Breathing
    });
  }

}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});