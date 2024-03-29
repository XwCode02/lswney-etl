const program = require('commander')
const Etl = require('./etl')

const stageAttractions = require('./etl/stage/stage-attractions')
const stageWaitTimes = require('./etl/stage/stage-wait-times')

const attractions = require('./etl/explorer-service/attractions')
const destinations = require('./etl/explorer-service/destinations')

const waitCount = require('./etl/wait-times/wait-count')
const waitTimes = require('./etl/wait-times/wait-times')
const parkCount = require('./etl/wait-times/park-count')

program
  .version('0.1.0')
  .option('-f, --fn [value]', 'Add Fn')
  .option('-d, --date [value]', 'Add Date')
  .option('-l, --local [value]', 'Add Local')
  .option('-o, --option [value]', 'Add Option')
  .parse(process.argv)

const start = async () => {
  let { fn, date, local, option } = program
  let promises = []

  if (fn === 'stage-attractions') {
    promises.push(Etl(stageAttractions, date, 'shanghai'))
  }

  if (fn === 'stage-wait-times') {
    promises.push(Etl(stageWaitTimes, date, 'shanghai'))
  }

  if (fn === 'attractions') {
    promises.push(Etl(attractions, date, local))
  }

  if (fn === 'destinations') {
    promises.push(Etl(destinations, date, local))
  }

  if (fn === 'wait-times') {
    promises.push(Etl(waitTimes, date, local, option))
  }

  if (fn === 'wait-count') {
    promises.push(Etl(waitCount, date, local))
  }

  if (fn === 'park-count') {
    promises.push(Etl(parkCount, date, local))
  }

  let results = await Promise.all(promises)
  console.log(results)

  process.exit()
}

start()
