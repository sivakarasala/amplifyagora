import React from "react";
import { PhotoPicker } from "aws-amplify-react";
// prettier-ignore
import { Form, Button, Input, Notification, Radio, Progress } from "element-react";

class NewProduct extends React.Component {
  state = {
    description: "",
    price: "",
    shipped: false
  };

  handleAddProduct = () => {
    console.log("Aum namah shivaya");
  };
  render() {
    const { shipped } = this.state;
    return (
      <div className="flex-center">
        <h2 className="header">Add New Product</h2>
        <div>
          <Form className="market-header">
            <Form.Item label="Add Product Description">
              <Input
                type="text"
                icon="information"
                placeholder="Description"
                onChange={description => this.setState({ description })}
              />
            </Form.Item>
            <Form.Item label="Set Product Price">
              <Input
                type="number"
                icon="plus"
                placeholder="Price ($USD)"
                onChange={price => this.setState({ price })}
              />
            </Form.Item>
            <Form.Item label="Is the Product Shipped or Emailed to the Customer?">
              <Radio
                value="true"
                checked={shipped === true}
                onChange={() => this.setState({ shipped: true })}
              >
                Shipped
              </Radio>
              <Radio
                value="false"
                checked={shipped === false}
                onChange={() => this.setState({ shipped: false })}
              >
                Emailed
              </Radio>
            </Form.Item>
            <PhotoPicker />
            <Form.Item>
              <Button type="primary" onClick={this.handleAddProduct}>
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default NewProduct;
