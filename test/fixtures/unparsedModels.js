module.exports.singleObjectWithArray = {
    googleMapsKey: [{
        $: {
            fieldLabel: 'Google Maps Key',
            name: './googleMapsKey',
            fieldDescription: 'The API key for Google Maps',
            allowBlank: 'false',
            xtype: 'textfield'
        }
    }]
};

module.exports.flatModel = {
    $: {},
    beverageList: [{
        $: {
            fieldLabel: 'Beverage',
            fieldDescription: 'Select the Beverage Value. This field may take a while to load, please wait.',
            name: './beverage',
            type: 'select',
            width: '50',
            xtype: 'selection',
            allowBlank: 'false'
        },
        listeners: [{
            $: {}
        }]
    }],
    brandList: [{
        $: {
            fieldLabel: 'Brand',
            fieldDescription: 'Select the Brand Value. This field may take a while to load, please wait.',
            name: './brand',
            type: 'select',
            width: '50',
            xtype: 'selection',
            allowBlank: 'false'
        },
        listeners: [{
            $: {}
        }]
    }],
    productList: [{
        $: {
            fieldLabel: 'Product',
            fieldDescription: 'If the author chooses one product, only one option will appear on the product locator screen.',
            name: './product',
            type: 'select',
            width: '50',
            xtype: 'selection'
        },
        listeners: [{
            $: {}
        }]
    }],
    hideProductDropdown: [{
        $: {
            defaultValue: '{Boolean}false',
            type: 'checkbox',
            xtype: 'selection',
            inputValue: 'yes',
            name: './hideProductDropdown',
            fieldLabel: 'Hide Product List',
            fieldDescription: 'If checked, the product list will not be visible. The search will always be performed using the selected product.'
        }
    }]
};

module.exports.bigModel = {
    $: {
    },
    items: [{
        $: {
        },
        programName: [{
            $: {
                path: '/apps/marketingservices/components/base/base_dialog/items/programName.infinity.json',
                xtype: 'cqinclude'
            }
        }],
        googleMapsKey: [{
            $: {
                fieldLabel: 'Google Maps Key',
                name: './googleMapsKey',
                fieldDescription: 'The API key for Google Maps',
                allowBlank: 'false',
                xtype: 'textfield'
            }
        }],
        productLocatorApiClientID: [{
            $: {
                fieldLabel: 'Product Locator API Client ID',
                name: './productLocatorApiClientID',
                fieldDescription: 'The Client ID for the Product Locator API',
                allowBlank: 'false',
                xtype: 'textfield'
            },
            listeners: [{
                $: {
                }
            }]
        }],
        selectProduct: [{
            $: {
                xtype: 'dialogfieldset',
                padding: '0px 5px 0px 10px',
                title: 'Select Product Configuration'
            },
            items: [{
                $: {
                },
                beverageList: [{
                    $: {
                        fieldLabel: 'Beverage',
                        fieldDescription: 'Select the Beverage Value. This field may take a while to load, please wait.',
                        name: './beverage',
                        type: 'select',
                        width: '50',
                        xtype: 'selection',
                        allowBlank: 'false'
                    },
                    listeners: [{
                        $: {
                        }
                    }]
                }],
                brandList: [{
                    $: {
                        fieldLabel: 'Brand',
                        fieldDescription: 'Select the Brand Value. This field may take a while to load, please wait.',
                        name: './brand',
                        type: 'select',
                        width: '50',
                        xtype: 'selection',
                        allowBlank: 'false'
                    },
                    listeners: [{
                        $: {
                        }
                    }]
                }],
                productList: [{
                    $: {
                        fieldLabel: 'Product',
                        fieldDescription: 'If the author chooses one product, only one option will appear on the product locator screen.',
                        name: './product',
                        type: 'select',
                        width: '50',
                        xtype: 'selection'
                    },
                    listeners: [{
                        $: {
                        }
                    }]
                }],
                hideProductDropdown: [{
                    $: {
                        type: 'checkbox',
                        xtype: 'selection',
                        inputValue: 'yes',
                        name: './hideProductDropdown',
                        fieldLabel: 'Hide Product List',
                        fieldDescription: 'If checked, the product list will not be visible. The search will always be performed using the selected product.'
                    }
                }]
            }]
        }]
    }]
};
