import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { updateSampleSection } from './sample-base';
import { PropertyPane } from './property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule Default sample
 */
function Default() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let scheduleObj;
    const data = extend([], dataSource.scheduleData, null, true);
    function change(args) {
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
    }
    function onDragStart(args) {
        args.navigation.enable = true;
    }
    return (<div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent height='650px' ref={schedule => scheduleObj = schedule} selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }} dragStart={(onDragStart.bind(this))}>
            <ViewsDirective>
              <ViewDirective option='Day'/>
              <ViewDirective option='Week'/>
              <ViewDirective option='WorkWeek'/>
              <ViewDirective option='Month'/>
              <ViewDirective option='Agenda'/>
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div className='datepicker-control-section'>
                    <DatePickerComponent value={new Date(2021, 0, 10)} showClearButton={false} change={change.bind(this)} placeholder='Current Date' floatLabelType='Always'></DatePickerComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
    </div>);
}
export default Default;

const root = createRoot(document.getElementById('sample'));
root.render(<Default />);