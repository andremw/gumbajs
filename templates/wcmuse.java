package com.tccc.{{packageName}}.components;

import com.adobe.cq.sightly.WCMUse;
import com.tccc.marketingservices.components.model.{{componentModelFolder}}.*;
import com.tccc.marketingservices.utils.PrepareDictionaryHelper;

public class {{controllerName}} extends WCMUse {

    {{#models}}
    private {{.}} {{#lowerCaseFirstLetter}}{{.}}{{/lowerCaseFirstLetter}};
    {{/models}}

    @Override
    public void activate() throws Exception {
        {{#models}}
        this.{{#lowerCaseFirstLetter}}{{.}}{{/lowerCaseFirstLetter}} = getResource().adaptTo({{.}}.class);
        {{/models}}
    }

    {{#models}}
    public {{.}} get{{.}}() {
        return this.{{#lowerCaseFirstLetter}}{{.}}{{/lowerCaseFirstLetter}};
    }

    {{/models}}
}
