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
                    expect(res.body.length).to.equal(4);
                    done(err);
                });
        });
    });

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
                        expect(res.body.length).to.equal(4);
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

    describe("POST /tracings/:projectID/teams", () => {

        describe("when the project id is valid", () => {
            it("should return confirmation message and add team", () => {
                let team = {
                    teamName: "team name test test test",
                    teamMembersID: ["5db5785c3e7f3c0666c9c0af", "5db5789c3e7f3c0666c9c0b0"]
                };
                return request(server)
                    .post("/tracings/5db57b283e7f3c0666c9c0b8/teams")
                    .send(team)
                    .expect(200)
                    .expect({message: 'team Successfully Added!'});
            });
        });

        describe("when the project id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .post("/tracings/9999/teams")
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

    /*
        describe("PUT /tracings/:projectID/teams/:teamID/teamName", () => {
            it("should return confirmation message and update team name", done => {
                request(server)
                    .put("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db5d622aa962a17eaf9ccb1/teamName")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .send({teamName: "team008-test"})
                    .expect(200)
                    .end((err, res) => {
                        expect({message: 'team name Successfully Update!'});
                        done(err);
                    });
            });
        });
    */

    /*
        describe("PUT /tracings/:projectID/teams/:teamID/teamMembersID/:whichTeamMemberIDToUpdate", () => {

            describe("when project id, team members id and index of the team member are valid", () => {
                it("should return confirmation message and update team member id", done => {
                    request(server)
                        .put("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db5d622aa962a17eaf9ccb1/teamMembersID/1")
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .send({teamMembersID: "5db578de3e7f3c0666c9c0b2"})
                        .expect(200)
                        .end((err, res) => {
                            expect({message: 'team member ID Successfully Modified!'});
                            done(err);
                        });
                });
            });

            describe("when project id, team members id are valid and index of team member id is invalid", () => {
                it("should return the NOT found message", done => {
                    request(server)
                        .put("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db5d622aa962a17eaf9ccb1/teamMembersID/9999")
                        .set("Accept", "application/json")
                        .expect("Content-Type", /json/)
                        .send({teamMembersID: "5db578de3e7f3c0666c9c0b2"})
                        .expect(200)
                        .end((err, res) => {
                            expect({message: "can NOT find the team member ID !!!"});
                            done(err);
                        });
                });
            });


        });
    */

    /*
        describe("DELETE /tracings/:projectID/teams/:teamID", () => {

            /!*
                        describe("when the project id and team id are valid", () => {
                            it("should return confirmation message and delete the team", done => {
                                request(server)
                                    .delete("/tracings/5db57b283e7f3c0666c9c0b8/teams/5dc15528ff07640c6947bfc7")
                                    .set("Accept", "application/json")
                                    .expect("Content-Type", /json/)
                                    .expect(200)
                                    .end((err, res) => {
                                        expect({message: 'team Successfully Deleted!'});
                                        done(err);
                                    });
                            });
                        });
            *!/

            /!*
                    describe("when the project id is invalid", () => {
                        it("should return the NOT found message", done => {
                            request(server)
                                .delete("/tracings/9999/teams/5dc15528ff07640c6947bfc7")
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
            *!/

            /!*
                    describe("when the team id is invalid", () => {
                        it("should return the NOT found message", done => {
                            request(server)
                                .delete("/tracings/5db57b283e7f3c0666c9c0b8/teams/9999")
                                .set("Accept", "application/json")
                                .expect("Content-Type", /json/)
                                .expect(200)
                                .expect({
                                    message: 'team NOT Successfully Deleted!',
                                    errmsg:
                                        {
                                            message:
                                                'Cast to ObjectId failed for value "9999" at path "_id" for model "Team"',
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
            *!/


        });
    */

    /*
        describe("DELETE /tracings/:projectID/teams/:teamID/teamMembersID/:teamMemberID", () => {

            /!*
                    describe("when the project id, team id and team member id are valid", () => {
                        it("should return confirmation message and delete the team member id", done => {
                            request(server)
                                .delete("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db5d622aa962a17eaf9ccb1/teamMembersID/5db578de3e7f3c0666c9c0b2")
                                .set("Accept", "application/json")
                                .expect("Content-Type", /json/)
                                .expect(200)
                                .end((err, res) => {
                                    expect({message: 'team Successfully Deleted!'});
                                    done(err);
                                });
                        });
                    });
            *!/

            /!*
                    describe("when the project id is invalid", () => {
                        it("should return the NOT found message", done => {
                            request(server)
                                .delete("/tracings/9999/teams/5db5d622aa962a17eaf9ccb1/teamMembersID/5db578de3e7f3c0666c9c0b2")
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
            *!/

            /!*
                    describe("when the team id is invalid", () => {
                        it("should return the NOT found message", done => {
                            request(server)
                                .delete("/tracings/5db57b283e7f3c0666c9c0b8/teams/9999/teamMembersID/5db578de3e7f3c0666c9c0b2")
                                .set("Accept", "application/json")
                                .expect("Content-Type", /json/)
                                .expect(200)
                                .expect({
                                    message: 'team NOT Found!',
                                    errmsg:
                                        {
                                            message:
                                                'Cast to ObjectId failed for value "9999" at path "_id" for model "Team"',
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
            *!/


        });
    */

});
