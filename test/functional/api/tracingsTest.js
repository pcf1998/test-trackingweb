const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
const _ = require("lodash");
let mongoose = require('../../../routes/db');

const Tracing = require("../../../models/tracings");


describe("Tracings", () => {

    before(function (done) {
        let username = 'leopan';
        let password = 'leo123456';
        let mongodburl = 'mongodb+srv://' + username + ':' + password + '@wit-tracking-system-cluster-t9uwg.mongodb.net/tracingsdb';
        mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to MongoDB Atlas!');
            done();
        });
    });

    describe("GET /tracings", () => {
        it("should return all the tracings", done => {
            request(server)
                .get("/tracings")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(5);
                    const result = _.map(res.body, tracings => {
                        return {id: tracings._id};
                    });
                    expect(result).to.deep.include({id: "5db57b283e7f3c0666c9c0b8"});
                    expect(result).to.deep.include({id: "5db57b543e7f3c0666c9c0b9"});
                    expect(result).to.deep.include({id: "5db57b593e7f3c0666c9c0ba"});
                    expect(result).to.deep.include({id: "5db5d5a8aa962a17eaf9ccaf"});
                    expect(result).to.deep.include({id: "5dc0a9011a741525d5ffa1d8"});
                    done(err);
                });
        });
    });

    describe("GET /tracings/:projectID", () => {
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
    });

    describe("POST /tracings", () => {
        it("should return confirmation message and update Tracing", () => {
            let tracing = {
                projectName: "test"
            };
            return request(server)
                .post("/tracings")
                .send(tracing)
                .expect(200)
                .expect({message: 'Tracing Successfully Added!'});
        });
    });

    describe("POST /tracings/:projectID/stages", () => {
        describe("when the project id is valid", () => {
            it("should return confirmation message and update stages", done => {
                request(server)
                    .post("/tracings/5db57b283e7f3c0666c9c0b8/stages")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({stages: ["stage test1: testtest11", "stage test2: testtest22"]})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: 'stages Successfully Added!'});
                        done(err);
                    });
            });
        });

        describe("when the project id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .post("/tracings/9999/stages")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({stages: ["stage test1: testtest11", "stage test2: testtest22"]})
                    .expect(200)
                    .expect({
                        message:
                            'Cast to ObjectId failed for value "9999" at path "_id" for model "Tracing"',
                        name: 'CastError',
                        stringValue: '"9999"',
                        kind: 'ObjectId',
                        value: '9999',
                        path: '_id'
                    }, (err, res) => {
                        done(err);
                    });
            });
        });

        describe("when the number of added stages is 0", () => {
            it("should return illegal input message", done => {
                request(server)
                    .post("/tracings/5db57b283e7f3c0666c9c0b8/stages")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({stages: []})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: "the number of added stages can't be 0 !"});
                        done(err);
                    });
            });
        });


    });

    describe("PUT /tracings/:projectID/projectName", () => {

        describe("when the project id is valid", () => {
            it("should return all the tracings", done => {
                request(server)
                    .put("/tracings/5db57b283e7f3c0666c9c0b8/projectName")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({projectName: "2019-07-31"})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: 'project name Successfully Updated!'});
                        done(err);
                    });
            });
        });

        describe("when the project id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .put("/tracings/999/projectName")
                    .set("Accept", "application/json")
                    .send({projectName: "2019-07-31"})
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({
                        message:
                            'Cast to ObjectId failed for value "999" at path "_id" for model "Tracing"',
                        name: 'CastError',
                        stringValue: '"999"',
                        kind: 'ObjectId',
                        value: '999',
                        path: '_id'
                    }, (err, res) => {
                        done(err);
                    });
            });
        });

    });

    describe("PUT /tracings/:projectID/status", () => {

        describe("when the project id is valid", () => {
            it("should return all the tracings", done => {
                request(server)
                    .put("/tracings/5db57b283e7f3c0666c9c0b8/status")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({status: "finished"})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: 'project status Successfully Updated!'});
                        done(err);
                    });
            });
        });

        describe("when the project id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .put("/tracings/999/status")
                    .set("Accept", "application/json")
                    .send({status: "finished"})
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({
                        message:
                            'Cast to ObjectId failed for value "999" at path "_id" for model "Tracing"',
                        name: 'CastError',
                        stringValue: '"999"',
                        kind: 'ObjectId',
                        value: '999',
                        path: '_id'
                    }, (err, res) => {
                        done(err);
                    });
            });
        });

        describe("when the input is same as the original one", () => {
            it("should return message that original status and new status can't be same", done => {
                request(server)
                    .put("/tracings/5db57b283e7f3c0666c9c0b8/status")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({status: "finished"})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: "original status and new status can't be same!"});
                        done(err);
                    });
            });
        });

    });

    describe("PUT /tracings/:projectID/stages/:whichStageToModify", () => {

        describe("when the project id is valid", () => {
            it("should return all the tracings", done => {
                request(server)
                    .put("/tracings/5db57b283e7f3c0666c9c0b8/stages/1")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({stages: "stage test: testtesttest"})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: 'stage Successfully Modified!'});
                        done(err);
                    });
            });
        });

        describe("when the project id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .put("/tracings/999/stages/1")
                    .set("Accept", "application/json")
                    .send({stages: "stage test: testtesttest"})
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({
                        message:
                            'Cast to ObjectId failed for value "999" at path "_id" for model "Tracing"',
                        name: 'CastError',
                        stringValue: '"999"',
                        kind: 'ObjectId',
                        value: '999',
                        path: '_id'
                    }, (err, res) => {
                        done(err);
                    });
            });
        });

        describe("when the input number of stage is illegal", () => {
            it("should return message that original status and new status can't be same", done => {
                request(server)
                    .put("/tracings/5db57b283e7f3c0666c9c0b8/stages/0")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({stages: "stage test: testtesttest"})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: "can NOT find the stage !!!"});
                        done(err);
                    });
            });
        });


    });

    describe("DELETE /tracings/:projectID", () => {

        describe("when the project id is valid", () => {
            it("should return confirmation message and delete the project", done => {
                request(server)
                    .delete("/tracings/5dc0a9011a741525d5ffa1d8")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect({message: 'project Successfully Deleted!'});
                        done(err);
                    });
            });
        });

        /*describe("when the project id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .delete("/tracings/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({
                        message: 'project NOT Successfully Deleted!',
                        errmsg:
                            {
                                message:
                                    'Cast to ObjectId failed for value "9999" at path "_id" for model "Tracing"',
                                name: 'CastError',
                                stringValue: '"9999"',
                                kind: 'ObjectId',
                                value: '9999',
                                path: '_id'
                            }
                    }, (err, res) => {
                        done(err);
                    });
            });
        });*/


    });

    /*
        describe("DELETE /tracings/:projectID/stages/:whichStageToDelete", () => {

            describe("when the project id is valid and the number of stage is valid", () => {
                it("should return confirmation message and delete the project", done => {
                    request(server)
                        .delete("/tracings/5db57b283e7f3c0666c9c0b8/stages/1")
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect({message: 'project Successfully Deleted!'});
                            done(err);
                        });
                });
            });

            describe("when the project id is invalid", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .delete("/tracings/9999/stages/1")
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .expect({
                            message:
                                'Cast to ObjectId failed for value "9999" at path "_id" for model "Tracing"',
                            name: 'CastError',
                            stringValue: '"9999"',
                            kind: 'ObjectId',
                            value: '9999',
                            path: '_id'
                        }, (err, res) => {
                            done(err);
                        });
                });
            });

            describe("when the the number of stage is invalid", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .delete("/tracings/5db57b283e7f3c0666c9c0b8/stages/0")
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect({message: "can NOT find the stage !!!"});
                            done(err);
                        });
                });
            });

            describe("when the the format of input number is illegal", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .delete("/tracings/5db57b283e7f3c0666c9c0b8/stages/abc")
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect({message: "which Stage To Delete MUST be a legal NUMBER"});
                            done(err);
                        });
                });
            });


        });
    */

});
