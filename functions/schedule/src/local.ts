import { argv } from 'process';
import { callCount, getScheduleAsSeasonDocument } from './handlers/getSchedule';
import { putSeasonDocument } from './services';

if (argv.includes('--updateSchedule')) {
    getScheduleAsSeasonDocument().then((seasonDocument) => {
        console.log(JSON.stringify(seasonDocument));
        console.log('Api request count: ', callCount);
        putSeasonDocument(seasonDocument).then(() => console.log('done!'));
    });
}
