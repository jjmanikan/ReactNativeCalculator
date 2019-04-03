import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class CalcButton extends React.Component{

    static defaultProps = {
        onPress: function() {},
        title: "",
        color: "white",
        backgroundColor: "black",
        //allows for custom styles
        style: {},

    }
    
    render(){

        //dynamic styles are passed in
        //put in array
        //hold background color
        var bc = this.props.backgroundColor;

        return(
            //...{this.props.style} allows for customer styles
            <TouchableOpacity onPress={this.props.onPress} style={[styles.container, {backgroundColor: bc}, {...this.props.style}]}>
                <Text style = {[styles.text,{color: this.props.color}]}>{this.props.title}</Text>
            </TouchableOpacity>

        );
    }

}

const styles = StyleSheet.create({
    container: {alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: 40, margin: 5},
    text:{fontSize: 30, fontWeight:'bold'},
});