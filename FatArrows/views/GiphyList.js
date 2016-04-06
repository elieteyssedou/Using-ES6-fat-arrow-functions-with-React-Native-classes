import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';


const TouchableImage = require('./TouchableImage');

// imageSize is used to statically size <Image/> instances
const windowDims = Dimensions.get('window'),
      itemSize   = (windowDims.width / 2) - 20,
      url        = 'http://api.giphy.com/v1/gifs/search?q=demoscene&api_key=dc6zaTOxFJmzC&limit=20';

const styles = StyleSheet.create({
    container : {
        paddingTop      : 30,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : '#F5FCFF',
        flexDirection   : 'row',
        flexWrap        : 'wrap'
    },

    touchable : {
        width  : itemSize,
        height : itemSize,
        margin : 7
    },

    topBar : {
        position        : 'absolute', 
        top             : 0, 
        height          : 25, 
        width           : windowDims.width, 
        backgroundColor : 'rgba(0,0,0,.8)'
    }
});



class GiphyList extends Component {
    // Initial state
    state = {
        // empty data array
        data          : [],
        animatedIndex : -1
    };

    // We will update the state of the application so that images can render
    onAfterLoad = (data) => {
        this.setState({
            data : data.data
        });
    };

    componentWillMount() {

        // Initiate query, parse, then update view via callback
        fetch(url)
            .then(function(r) {
                return r.json();
            })
            .then(this.onAfterLoad) // Success callback registration
            .catch(function(e) {    // Failure callback registartion
                alert('Failure fetching data');
                console.log(e)
            });
    }


    onItemPress = (index, data) => {
        var state = this.state;
        state.animatedIndex = index;
        this.setState(state);
    }

    buildImages(data) {
        let animIdx = this.state.animatedIndex,
            images  = [],
            length  = data.length,
            i       = 0,
            source,
            item;

        // Empty array?, pad with 10 undefines so that we can render placeholders
        if (data.length == 0) {
            data.length = length = 10;
        }
        
        for (; i < length; i++) {
            item = data[i];

            images.push(
                <TouchableImage data={item}
                                key={'img' + i}
                                style={styles.touchable}
                                index={i}
                                animate={animIdx == i}
                                onPress={this.onItemPress}/>
              
            )
        }

        return images;
    }

    render() {
        let state  = this.state,
            data   = state.data,
            images = this.buildImages(data);

        return (
            <View style={this.props.style}>
                <ScrollView contentContainerStyle={styles.container}
                            style={{backgroundColor: '#F5FCFF'}}>
            
                    {images}
                </ScrollView>

                <View style={styles.topBar}/> 
            </View>
        );
    }
}


module.exports = GiphyList;
