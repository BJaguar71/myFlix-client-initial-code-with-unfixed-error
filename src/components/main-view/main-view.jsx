// Importing React to create the component
import React from  'react';
// Making and exposing the MainView component in order to be usable in other files using the React.Component template
export class MainView extends React.Component {
  // Rendering the visual representation of the component
  render () {
    return (
      <div className="main-view">
        <div>Paris Is Burning</div>
        <div>Boy I Am</div>
        <div>There's Something In The Water</div>
      </div>
    );
  }
}