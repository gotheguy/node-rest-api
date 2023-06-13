let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);

describe("Products", () => {
  let testProductId;

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
        testProductId = res.body.product._id;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body.product).to.have.property(
          "name",
          "The Lord of the Rings"
        );
        expect(res.body.product).to.have.property(
          "description",
          "J.R.R. Tolkien"
        );
        expect(res.body.product).to.have.property("price", 19);
        done();
      });
  });

  /*
   * Test the /PUT/:id route
   */
  it("it should UPDATE a product given the id", (done) => {
    chai
      .request(app)
      .put(`/products/${testProductId}`)
      .send({
        name: "The Lord of the Rings - Special Edition",
        description: "J.R.R. Tolkien",
        price: 35,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.product).to.be.an("object");
        expect(res.body.product).to.have.property(
          "name",
          "The Lord of the Rings - Special Edition"
        );
        expect(res.body.product).to.have.property(
          "description",
          "J.R.R. Tolkien"
        );
        expect(res.body.product).to.have.property("price", 35);
        done();
      });
  });

  /*
   * Test the /DELETE/:id route
   */
  it("it should DELETE a product given the id", (done) => {
    chai
      .request(app)
      .delete(`/products/${testProductId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Deleted product.");
        done();
      });
  });
});
