---
  title: Sharepoint List Service for Angular
---

<div>
  'use strict';

angular
    .module('app', [])
    .factory('ListService', function($q) {
        return {
          create: function(siteUrl, listName, data){
            var deferred = $q.defer();
            var status = "";

        var clientContext = new SP.ClientContext(siteUrl);
          var oList = clientContext.get_web().get_lists().getByTitle(listName);
              
          var itemCreateInfo = new SP.ListItemCreationInformation();
          var oListItem = oList.addItem(itemCreateInfo);
              
          for (var key in data) {
          if (data.hasOwnProperty(key))
            oListItem.set_item(key , data[key]);
        }
              
          oListItem.update();
      
          clientContext.load(oListItem);
              
          clientContext.executeQueryAsync(
            function onSucess() {
            status = 'success';
            deferred.resolve(status);
          },
          function onError(sender, args){
            var error = 'Error on get data from list.';
            error += 'List: ' + listName;
            error += 'List: ' + args.get_message();
            console.log(error);
          }     
        );
        
          status = deferred.promise;
        
        return $q.when(status);
      },
      destroyById: function(siteUrl, listName, itemId) {
        var deferred = $q.defer();                
                var promise = deferred.promise;

        var clientContext = new SP.ClientContext(siteUrl);
          var oList = clientContext.get_web().get_lists().getByTitle(listName);
              
          var itemCreateInfo = new SP.ListItemCreationInformation();
          var oListItem = oList.getItemById(itemId);
              
        oListItem.deleteObject();
              
          clientContext.executeQueryAsync(
            function onSucess() {
              console.log('success');
            status = 'success';
            deferred.resolve(status);
          },
          function onError(sender, args){
            var error = 'Error on get data from list.';
            error += 'List: ' + listName;
            error += 'List: ' + args.get_message();
            console.log(error);
          }     
        );
        
        return promise;
      },
      destroy: function(siteUrl, listName, where){
        var that = this;
        var promises = [];                
                var fields =  [
                  { name: "ID", type: "Number" }
                ];

                this.getByQuery(siteUrl, listName, where, fields)
        .then(function(response){
          angular.forEach(response.results, function(result){
            promises.push(that.destroyById(siteUrl, listName, result.ID));
          });
        });
        
        return $q.all(promises);
      },
            buildQuery: function(fields, where, rowLimit) {
                rowLimit = rowLimit == undefined ? "" : rowLimit;

                var viewFields = '<ViewFields>';

                fields.forEach(function(field) {
                    viewFields += '<FieldRef Name="' + field.name + '" />';
                });

                viewFields += '</ViewFields>';

                return '<View>' +
                    viewFields +
                    '<Query>' + where + '</Query>' +
                    '<RowLimit>' + rowLimit + '</Rowlimit>' +
                    '</View>';
            },
            getByQuery: function(webUrl, listName, where, fields, rowLimit, usePaging, pagingInfo) {
                var queryXml = this.buildQuery(fields, where, rowLimit);
        var previousPagingInfo;

                var deferred = $q.defer();
                
                var promise = deferred.promise;

                var results = [];
                
                var response = {};

                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                    var context = SP.ClientContext.get_current();

                    var web = context.get_site().openWeb(webUrl);

                    var list = web.get_lists().getByTitle(listName);
                    var query = new SP.CamlQuery();

                    query.set_viewXml(queryXml);

          if (usePaging && pagingInfo)
                    {
                      var position = new SP.ListItemCollectionPosition(); 
                position.set_pagingInfo(pagingInfo);
                query.set_listItemCollectionPosition(position); 
                    }
                    
                    var items = list.getItems(query);

                    context.load(items);
                    context.executeQueryAsync(
                        function onSucess() {
                            var enumerator, item;

                            enumerator = items.getEnumerator();

                            var results = [];

                            while (enumerator.moveNext()) {
                                item = enumerator.get_current();
                                var result = {};

                                fields.forEach(function(field) {
                                    var type = "";
                                    if (!field.type)
                                        type = "Text";
                                    else
                                        type = field.type;

                                    switch (type) {
                                        case 'Text':
                                        case 'MultiText':
                                        case 'Yes/No':
                                        {
                                            if (item.get_item(field.name) == null)
                                                result[field.name] = "";
                                            else
                                                result[field.name] = item.get_item(field.name);
                                            break;
                                        }
                                        case 'Number': 
                                        {
                                          if (item.get_item(field.name) == null)
                                                result[field.name] = 0;
                                            else
                                                result[field.name] = item.get_item(field.name);
                                            break;                                        
                                        }
                                        case 'Date':
                                            {
                                                result[field.name] = item.get_item(field.name).format(field.options.mask);
                                                break;
                                            }
                                        case 'URL':
                                            {
                                                if (item.get_item(field.name) == null)
                                                    result[field.name] = "";
                                                else
                                                    result[field.name] = item.get_item(field.name).get_url();
                                                break;
                                            }
                                        case 'User':
                                            {
                                                var teste = item.get_item(field.name)
                                                result[field.name] = 
                                                {
                                                  id : item.get_item(field.name).get_lookupId(),
                                                  name : item.get_item(field.name).get_lookupValue()
                                                }
                                                break;
                                            }
                                        case 'Choice':
                                            {
                                                if (item.get_item(field.name) == null)
                                                    result[field.name] = "";
                                                else
                                                    result[field.name] = item.get_item(field.name);
                                                break;
                                            }
                                        case 'Lookup':
                                            {
                                                if (item.get_item(field.name) != null) {
                                                    result[field.name] = {
                                                        id: item.get_item(field.name).get_lookupId(),
                                                        value: item.get_item(field.name).get_lookupValue(),
                                                    }
                                                } else {
                                                    result[field.name] = {};
                                                }
                                                break;
                                            }
                                        case 'LookupMulti':
                                            {
                                                var items = [];
                                                var lookupValues = item.get_item(field.name);

                                                if (lookupValues != null) {
                                                    for (var x = 0; x < lookupValues.length; x++) {
                                                        items.push({
                                                            id: lookupValues[x].get_lookupId(),
                                                            value: lookupValues[x].get_lookupValue(),
                                                        });
                                                    }
                                                }

                                                result[field.name] = items;

                                                break;
                                            }
                                    }
                                });
                                result.listName = listName;

                                results.push(result);
                            }
                            
                            if (items.get_listItemCollectionPosition())
                              pagingInfo = items.get_listItemCollectionPosition().get_pagingInfo();
                            else
                              pagingInfo = null;
                            
                            response =  { 
                                    results : results,
                                    pagingInfo : pagingInfo
                                  }
                            
                            deferred.resolve(response);
                        },
                        function onError(sender, args) {
                            if (console)
                                console.error('Error on Get ' + listName + ":" + args.get_message());
                        }
                    );
                });                

                return promise;
            }
        }
    });
</div>