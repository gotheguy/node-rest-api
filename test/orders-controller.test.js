let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);

describe("Orders", () => {
  let testOrderId;
  let testUserId;
  let testProduct;

  before((done) => {
    chai
      .request(app)
      .post("/users")
      .send({
        firstName: "Michael",
        lastName: "Jones",
        email: "michael.jones@gmail.com",
        address: {
          city: "Redding",
          state: "California",
          zipCode: "96001",
          street: "2786 S Market St",
        },
      })
      .end((err, res) => {
        testUserId = res.body.user._id;

        chai
          .request(app)
          .post("/products")
          .send({
            name: "Laptop",
            description: "Lenovo Legion",
            price: 1200,
          })
          .end((err, res) => {
            testProduct = res.body.product;
            done();
          });
      });
  });

  /*
   * Test the /GET route
   */
  it("it should GET all orders", (done) => {
    chai
      .request(app)
      .get("/orders")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.orders).to.be.an("array");
        done();
      });
  });

  /*
   * Test the /POST route
   */
  it("it should POST an order", (done) => {
    chai
      .request(app)
      .post("/orders")
      .send({
        referenceNumber: "9238749234697234",
        total: 1200,
        userId: testUserId,
        items: testProduct,
      })
      .end((err, res) => {
        testOrderId = res.body.order._id;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body.order).to.have.property(
          "referenceNumber",
          "9238749234697234"
        );
        expect(res.body.order).to.have.property("total", 1200);
        expect(res.body.order).to.have.property("userId", testUserId);
        expect(res.body.order.items.some((item) => item === testProduct._id)).to
          .be.true;
        expect(res.body.order.items).to.have.lengthOf(1);
        done();
      });
  });

  /*
   * Test the /PUT/:id route
   */
  it("it should UPDATE an order given the id", (done) => {
    chai
      .request(app)
      .put(`/orders/${testOrderId}`)
      .send({
        referenceNumber: "9346875393485732",
        total: 1350,
        userId: testUserId,
        items: testProduct,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.order).to.have.property(
          "referenceNumber",
          "9346875393485732"
        );
        expect(res.body.order).to.have.property("total", 1350);
        expect(res.body.order).to.have.property("userId", testUserId);
        expect(res.body.order.items.some((item) => item === testProduct._id)).to
          .be.true;
        expect(res.body.order.items).to.have.lengthOf(1);
        done();
      });
  });

  /*
   * Test the /DELETE/:id route
   */
  it("it should DELETE an order given the id", (done) => {
    chai
      .request(app)
      .delete(`/orders/${testOrderId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Deleted order.");
        done();
      });
  });

  after((done) => {
    chai
      .request(app)
      .delete(`/users/${testUserId}`)
      .end((err, res) => {
        chai
          .request(app)
          .delete(`/products/${testProduct._id}`)
          .end((err, res) => {
            done();
          });
      });
  });
});
