package com.tccc.marketingservices.components.model.{{componentModelFolder}};

import com.tccc.marketingservices.utils.StyleBuilder;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import org.apache.sling.api.resource.Resource;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

@Model(adaptables = Resource.class)
public class {{modelName}} {

    {{#modelAttrs}}
    @Inject
    {{#optional}}
    @Optional
    {{/optional}}
    private {{#capitalize}}{{type}}{{/capitalize}} {{name}};

    {{/modelAttrs}}
    {{#modelAttrs}}
    public {{#capitalize}}{{type}}{{/capitalize}} get{{#capitalize}}{{name}}{{/capitalize}}() {
        return this.{{name}};
    }

    {{/modelAttrs}}
    // configure the stylebuilder if needed

    @PostConstruct
    public void activate() {

    }
}
