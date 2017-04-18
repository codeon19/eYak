// Index.ios.js - place code in here for IOS!!!

// Import a library to hel pcreate a Component
import React, {Component} from 'react';

// Create a Component
class Card extends Component {
   render() {
      return (
         <div className="shit" style={styles.containerStyle}>
            {this.props.children}
         </div>
      );
   }
}

const styles = {
  containerStyle: {
     marginLeft: 20,
     marginRight: 20,
     paddingTop: 20,
     paddingBottom: 10,
     paddingLeft: 24,
     borderRadius: 3,
     //boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
     backgroundColor: '#4adfdf'
  }
};


// Make component available to other parts of the app
export default Card;
