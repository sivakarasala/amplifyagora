import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getMarket } from "../graphql/queries";
import { Loading, Tabs, Icon } from "element-react";
import { Link } from "react-router-dom";

class MarketPage extends React.Component {
  state = {
    market: null,
    isLoading: true,
    isMarketOwner: false
  };

  componentDidMount() {
    this.handleGetMarket();
  }

  handleGetMarket = async () => {
    try {
      const input = {
        id: this.props.marketId
      };
      const result = await API.graphql(graphqlOperation(getMarket, input));
      console.log({ result });
      this.setState({ market: result.data.getMarket, isLoading: false }, () => {
        this.checkMarketOwner();
      });
    } catch (err) {
      console.error(err);
    }
  };

  checkMarketOwner = () => {
    const { user } = this.props;
    const { market } = this.state;
    if (user) {
      this.setState({ isMarketOwner: user.username === market.owner });
    }
  };
  render() {
    const { market, isLoading, isMarketOwner } = this.state;

    return isLoading ? (
      <Loading fullscreen={true} />
    ) : (
      <>
        {/* Back Button */}
        <Link className="link" to="/">
          Back to Markets List
        </Link>

        {/* Market MetaData */}
        <span className="items-center pt-2">
          <h2 className="mb-mr">{market.name}</h2>- {market.owner}
        </span>
        <div className="items-center pt-2">
          <span style={{ color: "var(--lightSquidInk)", paddingBottom: "1em" }}>
            <Icon name="date" className="icon" />
            {market.createdAt}
          </span>
        </div>
      </>
    );
  }
}

export default MarketPage;
