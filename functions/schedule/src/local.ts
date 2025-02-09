import { argv } from 'process';
import { getScheduleAsSeasonDocument } from './handlers/getSchedule';
import { putSeasonDocument } from './services';

if (argv.includes('--updateSchedule')) {
    getScheduleAsSeasonDocument().then((seasonDocument) => {
        console.log(JSON.stringify(seasonDocument));
        //putSeasonDocument(seasonDocument).then(() => console.log('done!'));
    });
}
