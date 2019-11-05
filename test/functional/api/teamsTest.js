const chai = require("chai");
const server = require("../../../bin/www");
const expect = chai.expect;
const request = require("supertest");
let mongoose = require('../../../routes/db');

describe("Team", () => {

    beforeEach((done) => {
        let username = 'leopan';
        let password = 'leo123456';
        let mongodburl = 'mongodb+srv://' + username + ':' + password + '@wit-tracking-system-cluster-t9uwg.mongodb.net/tracingsdb';
        mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            done();
        });
    });

    describe("GET /teams", () => {
        it("should return all the teams", done => {
            request(server)
                .get("/teams")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.a("array");
                    expect(res.body.length).to.equal(2);
                    done(err);
                });
        });
    });

    /*
        describe("GET /teams/:teamID", () => {

            describe("when the team id is valid", () => {
                it("should return the matching team", done => {
                    request(server)
                        .get(`/teams/5db5d622aa962a17eaf9ccb1`)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body).to.deep.include({_id: "5db5d622aa962a17eaf9ccb1"});
                            done(err);
                        });
                });
            });

            describe("when the team id is invalid", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .get("/teams/9999")
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .expect({
                            message:
                                'Cast to ObjectId failed for value "9999" at path "_id" for model "Team"',
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

        });
    */

    /*
        describe("GET /tracings/:projectID/teams/", () => {

            describe("when the project id is valid", () => {
                it("should return the matching team", done => {
                    request(server)
                        .get(`/tracings/5db57b283e7f3c0666c9c0b8/teams/`)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body).to.be.a("array");
                            expect(res.body.length).to.equal(2);
                            done(err);
                        });
                });
            });

            describe("when the project id is invalid", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .get("/tracings/9999/teams/")
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

        });
    */

    /*
        describe("GET /tracings/:projectID/teams/:teamID", () => {

            describe("when the project id and team id are valid", () => {
                it("should return the matching user", done => {
                    request(server)
                        .get(`/tracings/5db57b283e7f3c0666c9c0b8/teams/5db5d622aa962a17eaf9ccb1`)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body).to.deep.include({_id: "5db5d622aa962a17eaf9ccb1"});
                            done(err);
                        });
                });
            });

            describe("when the project id is invalid", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .get(`/tracings/9999/teams/5db5d622aa962a17eaf9ccb1`)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .expect({
                            message: 'Project NOT Found!',
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
            });

            describe("when the team id is invalid", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .get(`/tracings/5db57b283e7f3c0666c9c0b8/teams/9999`)
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .expect(200)
                        .expect({
                            message:
                                'Cast to ObjectId failed for value "9999" at path "_id" for model "Team"',
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


        });
    */


    /*describe("POST /users", () => {
        it("should return confirmation message and update User", () => {
            let user = {
                userName: "testtesttest",
                userPassword: "test123456",
                email: "testtesttest@example.com",
                mobilePhone: "1023945886",
                gender: "male",
                dateOfBirth: "1949-10-01"
            };
            return request(server)
                .post("/users")
                .send(user)
                .expect(200)
                .expect({message: 'User Successfully Added!'});
        });
    });

    describe("PUT /users/:userID/userName", () => {
        it("should return confirmation message and update user name", () => {
            request(server)
                .put("/users/5db5789c3e7f3c0666c9c0b0/userName")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .send({userName: "banana-test"})
                .expect(200)
                .end((err, res) => {
                    expect({message: "user name Successfully Updated!"});
                    done(err);
                });
        });
    });


    describe("DELETE /users/:userID", () => {

        describe("when the user id is valid", () => {
            it("should return confirmation message and delete the user", done => {
                request(server)
                    .delete("/users/5dc0b5ac638e562ae019129e")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect({message: 'user Successfully Deleted!'});
                        done(err);
                    });
            });
        });

        describe("when the user id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .delete("/users/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({
                        message: "user NOT Successfully Deleted!",
                        errmsg:
                            {
                                message:
                                    'Cast to ObjectId failed for value "9999" at path "_id" for model "User"',
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
        });


    });*/

});
