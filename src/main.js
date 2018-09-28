import './main.less';

import $ from 'jquery';
import _ from 'lodash';
import stache from 'can-stache';
import './component/comp/CMyComp';

$('#container').append(stache('<my-comp />')({
}));
$('#loading').fadeOut();