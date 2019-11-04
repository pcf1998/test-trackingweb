const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");

const Tracing = require("../../../models/tracings");

describe("Tracings", () => {
    describe("GET /tracings", () => {
        it("should return all the tracings", done => {
            request(server)
                .get("/tracings")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(4);
                    const result = _.map(res.body, tracings => {
                        return {id: tracings._id};
                    });
                    expect(result).to.deep.include({id: "5db57b283e7f3c0666c9c0b8"});
                    expect(result).to.deep.include({id: "5db57b543e7f3c0666c9c0b9"});
                    expect(result).to.deep.include({id: "5db57b593e7f3c0666c9c0ba"});
                    expect(result).to.deep.include({id: "5db5d5a8aa962a17eaf9ccaf"});
                    done(err);
                });
        });
    });

    /*describe("GET /tracings/:projectID", () => {
        describe("when the project id is valid", () => {
            it("should return the matching project", done => {
                request(server)
                    .get(`/tracings/5db57b283e7f3c0666c9c0b8`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.deep.include({_id: "5db57b283e7f3c0666c9c0b8"});
                        done(err);
                    });
            });
        });
        describe("when the project id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .get("/donations/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", "text/html; charset=utf-8")
                    .expect(404)
                    .expect({}, (err, res) => {
                        done(err);
                    });
            });
        });
    });*/













});