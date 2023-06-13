let app = require("../app");
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);

describe("Users", () => {
  let testUserId;

  /*
   * Test the /GET route
   */
  it("it should GET all users", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.users).to.be.an("array");
        done();
      });
  });

  /*
   * Test the /POST route
   */
  it("it should POST a user", (done) => {
    chai
      .request(app)
      .post("/users")
      .send({
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@gmail.com",
        address: {
          city: "Sacramento",
          state: "California",
          zipCode: "95825",
          street: "617 Munroe St",
        },
      })
      .end((err, res) => {
        testUserId = res.body.user._id;
        expect(res).to.have.status(201);
        expect(res).to.be.an("object");
        expect(res.body.user).to.have.property("firstName", "John");
        expect(res.body.user).to.have.property("lastName", "Smith");
        expect(res.body.user).to.have.property("email", "john.smith@gmail.com");
        expect(res.body.user.address).to.have.nested.property(
          "city",
          "Sacramento"
        );
        expect(res.body.user.address).to.have.nested.property(
          "state",
          "California"
        );
        expect(res.body.user.address).to.have.nested.property(
          "zipCode",
          "95825"
        );
        expect(res.body.user.address).to.have.nested.property(
          "street",
          "617 Munroe St"
        );
        done();
      });
  });

  /*
   * Test the /PUT/:id route
   */
  it("it should UPDATE a user given the id", (done) => {
    chai
      .request(app)
      .put(`/users/${testUserId}`)
      .send({
        firstName: "John",
        lastName: "Smith",
        email: "john.s.smith@outlook.com",
        address: {
          city: "Marshfield",
          state: "West Virginia",
          zipCode: "54449",
          street: "1710 N Central Ave",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an("object");
        expect(res.body.user).to.have.property("firstName", "John");
        expect(res.body.user).to.have.property("lastName", "Smith");
        expect(res.body.user).to.have.property(
          "email",
          "john.s.smith@outlook.com"
        );
        expect(res.body.user.address).to.have.nested.property(
          "city",
          "Marshfield"
        );
        expect(res.body.user.address).to.have.nested.property(
          "state",
          "West Virginia"
        );
        expect(res.body.user.address).to.have.nested.property(
          "zipCode",
          "54449"
        );
        expect(res.body.user.address).to.have.nested.property(
          "street",
          "1710 N Central Ave"
        );
        done();
      });
  });

  // /*
  //  * Test the /DELETE/:id route
  //  */
  it("it should DELETE a user given the id", (done) => {
    chai
      .request(app)
      .delete(`/users/${testUserId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Deleted user.");
        done();
      });
  });
});
