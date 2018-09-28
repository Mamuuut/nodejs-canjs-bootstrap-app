import Component from 'can-component';
import stache from 'can-stache';

import './my-comp.less';

import sView from './my-comp.stache';

import CMyCompModel from './CMyCompModel';

Component.extend({

    'tag' : 'my-comp',

    'viewModel' : function(aoAttr, oParentScope, elComp)
    {
        return new CMyCompModel(oParentScope.get('.'));
    },

    'view' : stache(sView)
});