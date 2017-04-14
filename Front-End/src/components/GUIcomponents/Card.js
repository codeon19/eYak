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
   //  borderWidth: 1,
   //  borderRadius: 2,
   //  borderColor: '#ddd',
   //  borderBottomWidth: 0,
   //  shadowColor: '#000',
   //  shadowOffset: { width: 0, height: 2 },
   //  shadowOpacity: 0.1,
   //  shadowRadius: 2,
   //  elevation: 1,
     marginLeft: 20,
     marginRight: 20,
     marginTop: 20,
     paddingTop: 30,
     paddingBottom: 10,
     borderRadius: 3,
     //boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
     backgroundColor: '#4adfdf'
  }
};


// Make component available to other parts of the app
export default Card;
