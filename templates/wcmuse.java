package com.tccc.{{packageName}}.components;

import com.adobe.cq.sightly.WCMUse;
import com.tccc.marketingservices.components.model.{{componentModelFolder}}.*;
import com.tccc.marketingservices.utils.PrepareDictionaryHelper;

public class {{controllerName}} extends WCMUse {

    {{#models}}
    private {{className}} {{modelName}};
    {{/models}}

    @Override
    public void activate() throws Exception {
        {{#models}}
        this.{{modelName}} = getResource().adaptTo({{className}}.class);
        {{/models}}
    }
    
    {{#models}}
    public {{className}} get{{className}}() {
        return this.{{modelName}};
    }

    {{/models}}
}
