let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);

describe("Products", () => {
  var createdProductId;
  const expectedProductName = "The Lord of the Rings - Special Edition";
  const expectedProductPrice = 35;

  /*
   * Test the /GET route
   */
  it("it should GET all products", (done) => {
    chai
      .request(app)
      .get("/products")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.products).to.be.an("array");
        done();
      });
  });

  /*
   * Test the /POST route
   */
  it("it should POST a product", (done) => {
    chai
      .request(app)
      .post("/products")
      .send({
        name: "The Lord of the Rings",
        description: "J.R.R. Tolkien",
        price: 19,
      })
      .end((err, res) => {
        createdProductId = res.body.product._id;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body.product).to.have.property("name");
        expect(res.body.product).to.have.property("description");
        expect(res.body.product).to.have.property("price");
        done();
      });
  });

  /*
   * Test the /PATCH/:id route
   */
  it("it should UPDATE a product given the id", (done) => {
    chai
      .request(app)
      .patch("/products/" + createdProductId)
      .send({
        name: "The Lord of the Rings - Special Edition",
        price: 35,
        description: "J.R.R. Tolkien",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.product).to.be.a("object");
        expect(res.body.product).to.have.property("name", expectedProductName);
        expect(res.body.product).to.have.property(
          "price",
          expectedProductPrice
        );
        done();
      });
  });

  /*
   * Test the /DELETE/:id route
   */
  it("it should DELETE a product given the id", (done) => {
    chai
      .request(app)
      .delete("/products/" + createdProductId)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Deleted product.");
        done();
      });
  });
});
