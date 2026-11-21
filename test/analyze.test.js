import test from"node:test";import assert from"node:assert/strict";import{analyzeSchedule,parseSchedule}from"../public/analyze.js";
test("detects a precedence cycle",()=>{const r=analyzeSchedule("T1 R(x)\nT2 W(x)\nT2 R(y)\nT1 W(y)");assert.equal(r.serializable,false);assert.ok(r.edges.length>=2);});
test("detects a dirty read before abort",()=>{const r=analyzeSchedule("T1 W(x)\nT2 R(x)\nT1 A");assert.equal(r.dirtyReads.length,1);});
test("detects a repeated read after another transaction commits",()=>{const r=analyzeSchedule("T1 R(x)\nT2 W(x)\nT2 C\nT1 R(x)");assert.equal(r.nonRepeatableReads.length,1);});
test("rejects malformed operations",()=>{assert.throws(()=>parseSchedule("T1 DROP TABLE users"),/Line 1/);});
