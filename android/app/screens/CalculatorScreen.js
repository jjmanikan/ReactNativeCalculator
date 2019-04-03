require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.display.memoryDisplay");
require("./../lib/swisscalc.display.numericDisplay");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.calc.calculator.js");

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CalcButton from './../components/CalcButton';
import CalcDisplay from './../components/CalcDisplay';

export default class CalculatorScreen extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            display: "0",
        };

        //Initializes calculator
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();
            
        //Initialize pan responder
        //swipe display to delete
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                if(Math.abs(gestureState.dx) >= 50){
                    this.onBackspacePress();
                }
            }

        
        });
        
    }

    //function when a digit is pressed on calculator
    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({display: this.calc.getMainDisplay() })
    }

    //for binary operators
    onBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({display: this.calc.getMainDisplay() })
    }

    //for unary operators
    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({display: this.calc.getMainDisplay() })
    }

    //function that clears display when button is pressed
    onClearPress = () => {
        this.calc.clear();
        this.setState({display: this.calc.getMainDisplay() })
    }

    //function when plus minus is pressed
    onPlusMinusPress = () => {
        this.calc.negate();
        this.setState({display: this.calc.getMainDisplay() })
    }

    //function when equals button is presse
    onEqualsPress = () => {
        this.calc.equalsPressed();
        this.setState({display: this.calc.getMainDisplay() })
    }

    onBackspacePress = () => {
        this.calc.backspace();
        this.setState({display: this.calc.getMainDisplay() })
    }

    
    

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
                    <CalcDisplay display= {this.state.display}/>
                </View>
                <View styles={styles.buttonContainer}>
                    <View style = {styles.buttonRow}>
                        <CalcButton onPress={() => {this.onClearPress()}} title="C" color="lightblue" backgroundColor="grey"/>
                        <CalcButton onPress= {() => {this.onPlusMinusPress()}} title="+/-" color="lightblue" backgroundColor="grey"/>
                        <CalcButton onPress={() => {this.onUnaryOperatorPress(this.oc.PercentOperator)}}title="%" color="lightblue" backgroundColor="grey"/>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress(this.oc.DivisionOperator)}}title="/" color="lightblue" backgroundColor="lightgrey"/>
                    </View>

                    <View style = {styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("7")}} title="7" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onDigitPress("8")}} title="8" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onDigitPress("9")}} title="9" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress(this.oc.MultiplicationOperator)}}title="x" color="lightblue" backgroundColor="lightgrey"/>
                    </View>

                    <View style = {styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("4")}} title="4" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onDigitPress("5")}} title="5" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onDigitPress("6")}} title="6" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress(this.oc.SubtractionOperator)}}title="-" color="lightblue" backgroundColor="lightgrey"/>
                    </View>

                    <View style = {styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("1")}} title="1" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onDigitPress("2")}} title="2" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onDigitPress("3")}} title="3" color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress(this.oc.AdditionOperator)}}title="+" color="lightblue" backgroundColor="lightgrey"/>
                    </View>

                    <View style = {styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("0")}} title="0" color="lightblue" backgroundColor="black" style={{flex: 2}}/>
                        <CalcButton onPress={() => {this.onDigitPress(".")}} title="." color="lightblue" backgroundColor="black"/>
                        <CalcButton onPress={this.onEqualsPress}title="=" color="lightblue" backgroundColor="lightgrey"/>
                    </View>
                </View>
                
            </View>

        );

    }

}

const styles = StyleSheet.create({
    container: {flex: 1},
    displayContainer: {flex: 1, justifyContent: "flex-end"},
    buttonRow: { flexDirection: "row", justifyContent: "space-between"},
    buttonContainer: {paddingBottom: 20}
});