package com.tccc.{{packageName}}.components;

import com.adobe.cq.sightly.WCMUse;
import com.tccc.marketingservices.components.model.{{componentModelFolder}}.*;
import com.tccc.marketingservices.utils.PrepareDictionaryHelper;

public class {{controllerName}} extends WCMUse {

    {{#models}}
    private {{modelName}} {{#lowerCaseFirstLetter}}{{modelName}}{{/lowerCaseFirstLetter}};
    {{/models}}

    @Override
    public void activate() throws Exception {
        {{#models}}
        this.{{#lowerCaseFirstLetter}}{{modelName}}{{/lowerCaseFirstLetter}} = getResource().adaptTo({{modelName}}.class);
        {{/models}}
    }

    {{#models}}
    public {{modelName}} get{{modelName}}() {
        return this.{{#lowerCaseFirstLetter}}{{modelName}}{{/lowerCaseFirstLetter}};
    }

    {{/models}}
}
