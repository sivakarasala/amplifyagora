import React from "react";
import { Auth, Hub } from "aws-amplify";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import "./App.css";

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    // console.dir(AmplifyTheme);
    this.getUserData();
    Hub.listen("auth", this, "onHubCapsule");
  }

  getUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      user ? this.setState({ user }) : this.setState({ user: null });
    } catch (err) {
      console.log(err);
    }
  };

  onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case "signIn":
        console.log("aum namah shivaya signed in");
        this.getUserData();
        break;
      case "signUp":
        console.log("aum namah shivaya signedup");
        break;
      case "signOut":
        console.log("aum namah shivaya signout");
        this.setState({ user: null });
        break;
      default:
        return;
    }
  };

  render() {
    const { user } = this.state;

    return !user ? <Authenticator theme={theme} /> : <div>App</div>;
  }
}

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  },
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb"
  }
};

// export default withAuthenticator(App, true, [], null, theme);

export default App;
