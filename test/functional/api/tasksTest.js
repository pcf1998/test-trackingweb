const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
let mongoose = require("../../../routes/db")

describe("Task", () => {

  describe("GET /tracings/:projectID/tasks", () => {

    describe("when the project id is valid", () => {
      it("should return all tasks in the project", done => {
        request(server)
          .get("/tracings/5db57b283e7f3c0666c9c0b8/tasks/")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.be.a("array")
            done(err)
          })
      })
    })

    describe("when the project id is invalid", () => {
      it("should return the NOT found message", done => {
        request(server)
          .get("/tracings/9999/tasks/")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({
            message:
                            "Cast to ObjectId failed for value \"9999\" at path \"_id\" for model \"Tracing\"",
            name: "CastError",
            stringValue: "\"9999\"",
            kind: "ObjectId",
            value: "9999",
            path: "_id"
          }, (err, res) => {
            done(err)
          })
      })
    })

  })

  describe("GET /tracings/:projectID/tasks/:taskID", () => {

    describe("when the project id and task id are valid", () => {
      it("should return the specific task in the project", done => {
        request(server)
          .get("/tracings/5db57b283e7f3c0666c9c0b8/tasks/5db5d612aa962a17eaf9ccb0")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.deep.include({_id: "5db5d612aa962a17eaf9ccb0"})
            done(err)
          })
      })
    })

    describe("when the project id is invalid", () => {
      it("should return the NOT found message", done => {
        request(server)
          .get("/tracings/9999/tasks/5db5d612aa962a17eaf9ccb0")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({
            message: "Project NOT Found!",
            errmsg:
                            {
                              message:
                                    "Cast to ObjectId failed for value \"9999\" at path \"_id\" for model \"Tracing\"",
                              name: "CastError",
                              stringValue: "\"9999\"",
                              kind: "ObjectId",
                              value: "9999",
                              path: "_id"
                            }
          }, (err, res) => {
            done(err)
          })
      })
    })

    describe("when the task id is invalid", () => {
      it("should return the NOT found message", done => {
        request(server)
          .get("/tracings/5db57b283e7f3c0666c9c0b8/tasks/9999")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect({
            message:
                            "Cast to ObjectId failed for value \"9999\" at path \"_id\" for model \"Task\"",
            name: "CastError",
            stringValue: "\"9999\"",
            kind: "ObjectId",
            value: "9999",
            path: "_id"
          }, (err, res) => {
            done(err)
          })
      })
    })


  })

  describe("GET /tracings/:projectID/teams/:teamID/tasks/", () => {
    it("should return all tasks in the team", done => {
      request(server)
        .get("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db58d338b292e0a03a64b53/tasks")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          done(err)
        })
    })
  })

  describe("GET /tracings/:projectID/teams/:teamID/tasks/:taskID", () => {
    it("should return the specific task in the team", done => {
      request(server)
        .get("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db58d338b292e0a03a64b53/tasks/5db5d612aa962a17eaf9ccb0")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.deep.include({_id: "5db5d612aa962a17eaf9ccb0"})
          done(err)
        })
    })
  })

  describe("POST /tracings/:projectID/teams/:teamID/tasks", () => {
    it("should return confirmation message and add task", () => {
      let task = {
        taskName: "task name test test test",
        membersID: "5db578ca3e7f3c0666c9c0b1"
      }
      return request(server)
        .post("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db58d338b292e0a03a64b53/tasks")
        .send(task)
        .expect(200)
        .expect({message: "task Successfully Added!"})
    })
  })

  describe("PUT /tracings/:projectID/teams/:teamID/tasks/:taskID/taskContent", () => {
    it("should return confirmation message and update task content", done => {
      request(server)
        .put("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db58d338b292e0a03a64b53/tasks/5db5d612aa962a17eaf9ccb0/taskContent")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send({taskContent: "task content -test"})
        .expect(200)
        .end((err, res) => {
          expect({message: "task content Successfully Update!"})
          done(err)
        })
    })
  })

  describe("PUT /tracings/:projectID/teams/:teamID/tasks/:taskID//taskName", () => {
    it("should return confirmation message and update task name", done => {
      request(server)
        .put("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db58d338b292e0a03a64b53/tasks/5db5d612aa962a17eaf9ccb0/taskName")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send({taskName: "task0009 -test"})
        .expect(200)
        .end((err, res) => {
          expect({message: "task name Successfully Update!"})
          done(err)
        })
    })
  })

  describe("PUT /tracings/:projectID/teams/:teamID/tasks/:taskID/taskStatus", () => {
    it("should return confirmation message and update task status", done => {
      request(server)
        .put("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db58d338b292e0a03a64b53/tasks/5db5d612aa962a17eaf9ccb0/taskStatus")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .send({status: "finished"})
        .expect(200)
        .end((err, res) => {
          expect({message: "task status Successfully Update!"})
          done(err)
        })
    })
  })

  describe("DELETE /tracings/:projectID/teams/:teamID/tasks/:taskID", () => {
    it("should return confirmation message and delete the task", done => {
      request(server)
        .delete("/tracings/5db57b283e7f3c0666c9c0b8/teams/5db58d338b292e0a03a64b53/tasks/5dc18911191d551afbf5dd17")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect({message: "task Successfully Deleted!"})
          done(err)
        })
    })


  })


})