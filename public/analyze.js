export function parseSchedule(source){
  const operations=[];
  for(const [lineIndex,raw] of String(source).split(/\r?\n/).entries()){
    const line=raw.trim();if(!line||line.startsWith("#"))continue;
    let m=line.match(/^([A-Za-z][A-Za-z0-9_]*)\s+(R|W)\s*\(\s*([A-Za-z][A-Za-z0-9_]*)\s*\)$/i);
    if(m){operations.push({tx:m[1],kind:m[2].toUpperCase(),item:m[3],line:lineIndex+1});continue;}
    m=line.match(/^([A-Za-z][A-Za-z0-9_]*)\s+(C|A)$/i);
    if(m){operations.push({tx:m[1],kind:m[2].toUpperCase(),item:null,line:lineIndex+1});continue;}
    throw new Error("Line "+(lineIndex+1)+": use T1 R(x), T2 W(x), T1 C, or T1 A.");
  }
  if(!operations.length)throw new Error("Enter at least one operation.");
  return operations;
}
function hasPath(graph,start,target,seen=new Set()){if(start===target)return true;if(seen.has(start))return false;seen.add(start);for(const next of graph.get(start)||[])if(hasPath(graph,next,target,seen))return true;return false;}
export function analyzeSchedule(source){
  const ops=parseSchedule(source),transactions=[...new Set(ops.map(o=>o.tx))],graph=new Map(transactions.map(t=>[t,new Set()])),edges=[];
  for(let i=0;i<ops.length;i++)for(let j=i+1;j<ops.length;j++){const a=ops[i],b=ops[j];if(a.tx!==b.tx&&a.item&&a.item===b.item&&(a.kind==="W"||b.kind==="W")){if(!graph.get(a.tx).has(b.tx)){graph.get(a.tx).add(b.tx);edges.push({from:a.tx,to:b.tx,item:a.item,first:a.kind,second:b.kind});}}}
  const dirtyReads=[];
  for(let i=0;i<ops.length;i++){const read=ops[i];if(read.kind!=="R")continue;let writer=-1;for(let j=0;j<i;j++)if(ops[j].item===read.item&&ops[j].kind==="W"&&ops[j].tx!==read.tx)writer=j;if(writer>=0){const tx=ops[writer].tx;const ended=ops.slice(writer+1,i).some(o=>o.tx===tx&&(o.kind==="C"||o.kind==="A"));if(!ended)dirtyReads.push({reader:read.tx,writer:tx,item:read.item,line:read.line});}}
  const nonRepeatableReads=[];
  for(const tx of transactions){const lastRead=new Map();for(let i=0;i<ops.length;i++){const op=ops[i];if(op.tx!==tx)continue;if(op.kind==="R"){const previous=lastRead.get(op.item);if(previous!==undefined){const committedWrite=ops.slice(previous+1,i).find(o=>o.item===op.item&&o.kind==="W"&&o.tx!==tx&&ops.slice(ops.indexOf(o)+1,i).some(end=>end.tx===o.tx&&end.kind==="C"));if(committedWrite)nonRepeatableReads.push({transaction:tx,item:op.item,firstLine:ops[previous].line,secondLine:op.line,writer:committedWrite.tx});}lastRead.set(op.item,i);}else if(op.kind==="C"||op.kind==="A"){lastRead.clear();}}}
  let cycle=null;for(const from of transactions)for(const to of graph.get(from)){if(hasPath(graph,to,from)){cycle=[from,to];break;} } 
  const serializable=transactions.every(from=>[...graph.get(from)].every(to=>!hasPath(graph,to,from)));
  return {operations:ops,transactions,edges,serializable,cycle,dirtyReads,nonRepeatableReads};
}
