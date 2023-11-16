import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.use(chaiHttp);

describe("Car Value API", () => {
  describe("POST /carvalue", () => {   
    it("should return an error if model and year are not provided", async () => {
      const res = await chai.request(app).post("/carvalue").send({});
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.equal("Please input a model and year.");
    });

    it("should return an error if year is less than 1894", async () => {
      const res = await chai
        .request(app)
        .post("/carvalue")
        .send({ model: "Civic", year: 1893 });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.equal("Please input a valid year above 1893.");
    });

    it("should calculate car value correctly", async () => {
      const res = await chai
        .request(app)
        .post("/carvalue")
        .send({ model: "Civic", year: 2014 });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("carValue");
      expect(res.body.carValue).to.be.a("number");
      expect(res.body.carValue).to.equal(6614);
    });

    it("should return an error if model is invalid", async () => {
      const res = await chai
        .request(app)
        .post("/carvalue")
        .send({ model: 123, year: 2014 });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.equal("Invalid model");
    });

    it("should return an error if year is invalid", async () => {
      const res = await chai
        .request(app)
        .post("/carvalue")
        .send({ model: "Civic", year: "invalid" });
      expect(res).to.have.status(400);
      expect(res.body).to.have.property("error");
      expect(res.body.error).to.equal("Invalid year");
    });

    it("should handle valid input", async () => {
      const res = await chai
        .request(app)
        .post("/carvalue")
        .send({ model: "Corolla", year: 2020 });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("carValue");
      expect(res.body.carValue).to.be.a("number");
    });
  });
});
