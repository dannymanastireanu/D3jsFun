const numberTests = 200;
const numberOfShards = 3;

const colors = ["red", "green", "blue"];

const originalColors = Array(numberTests).fill("#ddd");

const tests = Array(numberTests)
  .fill()
  .map((_, i) => parseFloat((Math.random() * 50).toFixed(2)));
var list = d3.select("#list");

var listItems = list
  .selectAll("li")
  .data(tests)
  .enter()
  .append("li")
  .text((d) => d);

var data = Array(numberOfShards)
  .fill()
  .map((_, i) => ({ value: 1, name: `Shard ${i + 1}` }));

const bottomY = 250;
const textBottomDeplacement = 30;
// set up the svg
var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", 400)
  .attr("height", bottomY + textBottomDeplacement);

// create rectangles
var rects = svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (_, i) => i * 80)
  .attr("y", (d) => bottomY - d.value)
  .attr("width", 75)
  .attr("height", (d) => d.value)
  .attr("fill", (_, i) => colors[i]);

//create text labels
const labels = svg
  .selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .attr("x", (_, i) => i * 80 + 30)
  .attr("y", (d) => bottomY + textBottomDeplacement - d.value)
  .attr("text-anchor", "middle")
  .text((d) => d.name);

// const shards = createShards(tests, numberOfShards);
const shards = createChunks(tests, numberOfShards);
console.log(`shards: ${JSON.stringify(shards)}`);
const capacity = Array(numberOfShards).fill(0);

doAnimation();

function doAnimation() {
  var animation = setInterval(function () {
    if (shards[0].testsTime.length !== 0) {
      for (let i = 0; i < shards.length; i++) {
        const currentTime = shards[i].testsTime.shift();
        const indexInArray = shards[i].index.shift();
        if (indexInArray !== undefined) {
          originalColors[indexInArray] = colors[i];

          listItems.style(
            "background-color",
            (d, indexInLista) => originalColors[indexInLista]
          );
        }

        data[i].value += currentTime;
        capacity[i] += currentTime;
      }
    } else {
      console.log("done");
      clearInterval(animation);
    }

    labels.data(data).text((_, i) => `${capacity[i].toFixed(1)}s`);

    rects
      .data(data)
      .transition()
      .duration(1000)
      .attr("y", (d) => bottomY - d.value)
      .attr("height", (d) => d.value);
  }, 1000);
}

//  ================================ Javascript functions ================================

function createChunks(tests, numberOfShards) {
  const numberOfTestsPerShard = Math.ceil(tests.length / numberOfShards);
  const result = _.chunk(tests, numberOfTestsPerShard);
  console.log(result);
  const maxLen = Math.max(...result.map((r) => r.length));

  return result.map((r, i) => ({
    testsTime:
      r.length !== maxLen ? [...r, ...Array(maxLen - r.length).fill(0)] : r,
    index:
      i === 0
        ? arrayRange(0, r.length - 1)
        : arrayRange(
            result.slice(0, i).flat().length,
            result.slice(0, i).flat().length + r.length - 1
          ),
  }));
}

function arrayRange(start, stop) {
  const step = 1;
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
}
