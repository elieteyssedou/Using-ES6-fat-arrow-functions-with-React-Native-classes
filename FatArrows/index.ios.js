import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
    ScrollView
} from 'react-native';

StatusBar.setBarStyle('light-content');
console.disableYellowBox = true; // This gets in the way!

const GiphyList = require('./views/GiphyList');

class FatArrows extends Component {
    render() {
        return <GiphyList style={{flex:1}}/>
    }
}

AppRegistry.registerComponent('FatArrows', () => FatArrows);