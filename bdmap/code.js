  /**
 * bdmap (Enhancement 1.1v)
 * The tinymce-plugins is used to import baidu map (Enhancement)
 * 
 * https://github.com/Five-great/tinymce-plugins
 * 
 * Copyright 2020, Five(Li Hailong) The Chengdu, China https://www.fivecc.cn/
 *
 * Licensed under MIT
 */

 tinymce.PluginManager.add('bdmap', function(editor, url) {
	var pluginName='插入百度地图';
	var baseURL=tinymce.baseURL||'https://unpkg.com/@npkg/tinymce-plugins';
	window.tinymceLng='';
	window.tinymceLat='';
	window.tinymceBDZoom='';
	window.tinymceBDW='';
	window.tinymceBDH='';
	window.tinymceBDBoxW='';
	window.tinymceBDBoxH='';
	window.tinymceBDBoxHtml='';
	window.tinymceBDDH='';
	window.tinymceBDSF = '';
	window.tinymceBDBgColor = '';
	window.tinymceBDDName = '';
	var openDialog = function() {
		return editor.windowManager.open({
			title: pluginName,
			size: 'large',
			//width: 800,
			//height: 500,
            body: {
                type: 'panel', // The root body type - a Panel or TabPanel
                items: [ // A list of panel components
                    {
                        type: 'iframe', // component type
                        name: 'bdmap_iframe', // identifier
                        label: '  ', // text for the iframe's title attribute
                        sandboxed: true,
                     }
                ]
            },
            initialData: {
                bdmap_iframe: `<!doctype html>
                <html>
                <head>
                <meta charset="utf-8" />
                <title>Baidu Maps</title>
                <style>
                    html { height:100%; }
                    body { height:100%;margin:0;padding:0;background-color:#fff; }
                    .bigBox{height: 100vh;width: 100%; overflow: hidden;position: relative;}
                    #search_box{position:fixed;top:5px;right:5px;z-index:9999;}
                    #search_box input{
                        -webkit-appearance: none;
                        border-radius:3px;
                        box-sizing:border-box;
                        outline:0;
                        box-shadow:0 0 3px rgba(0,0,0,0.4);
                    }
                    #search_box input[type="text"]{
                        background-color:#fff;
                        border:1px solid #ccc;
                        color:#000;
                        width:180px;
                        padding:5px;
                        font-size:16px;
                        opacity:0.7;
                        box-shadow:0 0 3px rgba(0,0,0,0.4);
                    }
                    #search_box input[type="button"]{
                        margin-left:5px;
                        background-color:#207ab7;
                        border:1px solid #207ab7;
                        color:#fff;
                        padding:4px 6px;
                        font-size:14px;
                    }
                    .setBox{ width: 100%; height: 26vh; position: absolute;left: 0;transition: all 0.6s;-webkit-transition: all 0.6s; bottom: -26vh;z-index: 99;background: #fff; }
                    .setBox.on{  bottom: 0; }
                
                    .tox .tox-form__controls-h-stack {
                    align-items: center;
                    display: flex;
                    }
                    
                .tox .tox-form__group {
                    box-sizing: border-box;
                    margin-bottom: 4px;
                    margin-right:5px;
                }
                .tox .tox-label, .tox .tox-toolbar-label {
                    color: rgba(34,47,62,.7);
                    display: block;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 1.3;
                    padding: 0 8px 0 0;
                    text-transform: none;
                    white-space: nowrap;
                    }
                    .tox .tox-selectfield select, .tox .tox-textarea, .tox .tox-textfield, .tox .tox-toolbar-textfield {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    background-color: #fff;
                    border-color: #ccc;
                    border-radius: 3px;
                    border-style: solid;
                    border-width: 1px;
                    box-shadow: none;
                    box-sizing: border-box;
                    color: #222f3e;
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                    font-size: 16px;
                    line-height: 24px;
                    margin: 0;
                    min-height: 34px;
                    outline: 0;
                    padding: 5px 4.75px;
                    resize: none;
                    width: 100%;
                }
                .tox .tox-textfield:focus,
                .tox .tox-selectfield select:focus,
                .tox .tox-textarea:focus {
                  border-color: #207ab7;
                  box-shadow: none;
                  outline: none;
                }
                .tox .tox-textfield:focus,
                .tox .tox-selectfield select:focus,
                .tox .tox-textarea:focus {
                  border-color: #207ab7;
                  box-shadow: none;
                  outline: none;
                  padding: 4px;
                }
                .tox .tox-button--icon .tox-icon svg, .tox .tox-button.tox-button--icon .tox-icon svg, .tox .tox-button.tox-button--secondary.tox-button--icon .tox-icon svg {
                    display: block;
                    fill: currentColor;
                    outline: none;
                }
                .tox .tox-lock.tox-locked .tox-lock-icon__unlock, .tox .tox-lock:not(.tox-locked) .tox-lock-icon__lock {
                    display: none;
                }
                .tox .tox-button--naked {
                    background-color: transparent;
                    border-color: transparent;
                    box-shadow: unset;
                    color: #222f3e;
                    padding: 4px;
                }
                .tox .tox-button--naked[disabled] {
                  background-color: #f0f0f0;
                  border-color: #f0f0f0;
                  box-shadow: none;
                  outline: none;
                  color: rgba(34, 47, 62, 0.5);
                }
                .tox .tox-button--naked:hover:not(:disabled) {
                  background-color: #e3e3e3;
                  border-color: #e3e3e3;
                  box-shadow: none;
                  color: #222f3e;
                  outline: none;
                      
                }
                .tox .tox-button--naked:focus:not(:disabled) {
                  background-color: #e3e3e3;
                  border-color: #e3e3e3;
                  box-shadow: none;
                  outline: none;
                
                  color: #222f3e;
                }
                .tox .tox-button--naked:active:not(:disabled) {
                  background-color: #d6d6d6;
                  border-color: #d6d6d6;
                  box-shadow: none;
                  color: #222f3e;
                }
                .tox .tox-button--naked .tox-icon svg {
                  fill: currentColor;
                }
                .tox .tox-button--naked.tox-button--icon:hover:not(:disabled) {
                  color: #222f3e;
                }
                
                .tox :not(svg):not(rect) {
                    box-sizing: inherit;
                    color: inherit;
                    cursor: inherit;
                    direction: inherit;
                    font-family: inherit;
                    font-size: inherit;
                    font-style: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                    -webkit-tap-highlight-color: inherit;
                    text-align: inherit;
                    text-decoration: inherit;
                    text-shadow: inherit;
                    text-transform: inherit;
                    vertical-align: inherit;
                    white-space: inherit;
                }
                .tox .tox-button {
                    
                    background-color: transparent;
                    background-image: none;
                    background-position: 0 0;
                    background-repeat: repeat;
                    /* border-color: #207ab7; */
                    border-radius: 3px;
                    border-style: solid;
                    border-width: 1px;
                    box-shadow: none;
                    box-sizing: border-box;
                    color: #333;
                    cursor: pointer;
                    display: inline-block;
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: normal;
                    line-height: 24px;
                    margin: 0;
                    outline: 0;
                    padding: 4px 16px;
                    text-align: center;
                    text-decoration: none;
                    text-transform: capitalize;
                    white-space: nowrap;
                }
                .textareaBox{ width: 26%;padding: 2% 0%; display: inline-block;vertical-align: top!important;margin-left:2%;}
                .setCheck{vertical-align: top!important; width: 8%;padding: 2% 0%; display: inline-block;margin-left:2%;}
                .setsize{vertical-align: top!important; width: 35%;padding: 2% 0%;  display: inline-block;margin-left:2%; }
                .openBtn{ display: block;transition: all 0.3s; margin: 0 auto; width: 30px;height: 30px; margin-top: -30px; cursor: pointer; transform: rotate(180deg); }
                
                .setBox.on .openBtn{transform: rotate(0deg);}
                .infoBoxContent{font-size:12px;padding:10px 8px;margin-bottom:3px; line-height: 1.5;letter-spacing: 1px;background: rgba(255,255,255,0.95); border: none; box-sizing: border-box;-moz-box-sizing:border-box; /* Firefox */-webkit-box-sizing:border-box; /* Safari */ }
                    .infoBoxContent>i:last-child{display: block; content: ""; width: 15px;transform: rotate(45deg); height: 15px;position: absolute;bottom:-5px;left: 50%; margin-left:-8px;z-index: -1; background:inherit ;}
                    .infoBoxContent *{line-height: 1.5; margin: 0;padding: 0; }
                    .BMap_cpyCtrl.BMap_noprint.anchorBL{display: none!important;}
                    .anchorBL{display: none!important;}
                    .showBox{ pointer-events: none; opacity: 0.5;}
                    .showBox[name="show"]{ pointer-events: all; opacity:1;}
                    .infoBox>img{display: none!important;}
                </style>
                <script charset="utf-8" src="https://api.map.baidu.com/api?v=3.0&ak=ONwdanPtvCDLHBSm184T2ynP"></script>
                <script src="https://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js"></script>
                
                </head>
                <body onload="initialize();">
                   <div class="bigBox">
                    <div id="search_box"><input id="kw" type="text" value="" autocomplete="off" placeholder="输入要搜索的地点" /><input type="button" value="搜索" onclick="searchByStationName()"></div>
                    <div id="map_canvas" style="width:100%; height:100%"></div>
                    <div class="setBox tox" id="setBoxID">
                        <a href="javascript:openBox()" class="openBtn" ><svg t="1604471043166" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7209" width="30" height="30">
                            <path d="M992.27 339.723l-466.975 216.039c-4.432 2.77-9.417 4.431-14.957 4.43100001l-1.662 0c-5.54 0-10.525-1.662-14.402-4.43100001l-466.976-216.03999999c-12.741-5.539-18.83499999-18.833-12.741-30.46600001s21.04999999-16.618 34.345-11.079l460.882 213.27 460.883-213.27c12.74-5.54 28.25100001 0 34.345 11.079 6.093 11.633 0.553 25.481-12.741 30.467z" fill="#1C6CA1"></path>
                            <path d="M48.902 470.45399999l460.882 213.27000001 460.883-213.27c12.74-5.54 28.25100001 0 34.345 11.079 6.093 11.633 0 24.928-12.741 30.467l-466.97599999 216.039c-4.432 2.77-9.417 4.431-14.95700001 4.431l-1.662 0c-5.54 0-10.525-1.662-14.402-4.431L27.29800001 512c-12.741-5.54-18.835-18.834-12.74100001-30.467s21.604-16.618 34.345-11.07900001z" fill="#1C6CA1"></path></svg>
                        </a>
                        <div class="setsize " style="width: 18%;">
                            <label class="tox-label" for="form-field_597838573111604453101745" style="font-size: 18px; padding-left:0px; letter-spacing: 1px;margin-bottom:10px; border-bottom: 1px solid #d6d6d6;">设置地图宽高</label>
                            <div class="tox-form__controls-h-stack" style="padding-left:10px;">
                                <div class="tox-form__group">
                                    <label class="tox-label" for="form-field_597838573111604453101745">宽</label>
                                    <input type="text" tabindex="-1" id="wInputID"   onBlur="setWHsize(0)" data-alloy-tabstop="true" class="tox-textfield" id="">
                                </div>
                                <div class="tox-form__group">
                                    <label class="tox-label" for="">高</label>
                                    <input type="text" tabindex="-1" id="hInputID"   onBlur="setWHsize(1)" data-alloy-tabstop="true" class="tox-textfield" >
                                </div>
                                <div class="tox-form__group"><label class="tox-label">&nbsp;</label>
                                     <button title="保持宽高比" type="button" data-alloy-tabstop="true" tabindex="-1" class="tox-lock tox-button tox-button--naked tox-button--icon tox-locked" aria-pressed="true">
                                         <span class="tox-icon tox-lock-icon__lock" id="lockID" style="display: none;"  onclick="lock(true)"><svg width="24" height="24"><path d="M16.3 11c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H8V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h.3zM10 8v3h4V8a1 1 0 0 0-.3-.7A1 1 0 0 0 13 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7z" fill-rule="evenodd"></path></svg></span>
                                         <span class="tox-icon tox-lock-icon__unlock" id="unlockID" style="display: block;"  onclick="lock(false)"><svg width="24" height="24"><path d="M16 5c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h-2V8a1 1 0 0 0-.3-.7A1 1 0 0 0 16 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7v3h.3c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H4.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H11V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2z" fill-rule="evenodd"></path></svg></span>
                                    </button>
                                </div>
                                 
                                
                            </div>
                            <div class="tox-form__group"  style="padding-left:10px;" >
                                <input type="text" tabindex="-1" id="bdDNameID"  style="display: none; height: 28px;min-height: 28px;" onBlur="setbdDName()" placeholder="请输入导航目的名称" data-alloy-tabstop="true" class="tox-textfield" >
                            </div>
                        </div>
                        <div class="setCheck">
                            <div class="tox-form__group">
                                <label class="tox-label" style="font-size: 18px; padding-left:0px; letter-spacing: 1px;margin-bottom:10px; border-bottom: 1px solid #d6d6d6;">控件设置</label>
                                <label class="tox-checkbox" onclick="showBOX()">
                                 <input type="checkbox" data-alloy-tabstop="true" tabindex="-1" class="tox-checkbox__input" id="openboxID">
                                 <span unselectable="on" class="tox-checkbox__label tox-label"  for="form-field_6689627266931604472573007" style="user-select: none; display: inline!important;">信息弹框</span>
                               </label><br>
                                <label class="tox-checkbox" onclick="openSF()">
                                        <input type="checkbox" data-alloy-tabstop="true" tabindex="-1" class="tox-checkbox__input" id="openSFID">
                                        <span unselectable="on" class="tox-checkbox__label tox-label"  for="form-field_6689627266931604472573007" style="user-select: none; display: inline!important;">缩放控件</span>
                                </label>
                                <label class="tox-checkbox" onclick="openDH()">
                                    <input type="checkbox" data-alloy-tabstop="true" tabindex="-1" class="tox-checkbox__input" id="openDHID">
                                    <span unselectable="on" class="tox-checkbox__label tox-label"  for="form-field_6689627266931604472573007" style="user-select: none; display: inline!important;">导航功能</span>
                                </label><br>
                
                            </div>
                        </div>
                        <div class="setsize showBox">
                                <label class="tox-label" for="form-field_597838573111604453101745" style="font-size: 18px; padding-left:0px; letter-spacing: 1px;margin-bottom:10px; border-bottom: 1px solid #d6d6d6;">设置信息弹框</label>
                                <div class="tox-form__controls-h-stack" style="padding-left:10px;">
                                    <div class="tox-form__group" style="flex: 1;">
                                        <label class="tox-label" for="form-field_597838573111604453101745">宽</label>
                                        <input type="text" tabindex="-1" id="boxwInputID"   onBlur="setboxWHsize(0)" data-alloy-tabstop="true" class="tox-textfield" id="">
                                    </div>
                                    <div class="tox-form__group" style="flex: 1;">
                                        <label class="tox-label" for="">高</label>
                                        <input type="text" tabindex="-1" id="boxhInputID"   onBlur="setboxWHsize(1)" data-alloy-tabstop="true" class="tox-textfield" >
                                    </div>
                                        <div class="tox-form__group" style="flex: 0.5;"><label class="tox-label">&nbsp;</label>
                                         <button title="保持宽高比" type="button" data-alloy-tabstop="true" tabindex="-1" class="tox-lock tox-button tox-button--naked tox-button--icon tox-locked" aria-pressed="true">
                                             <span class="tox-icon tox-lock-icon__lock" id="boxlockID"  style="display: none;"  onclick="boxlock(true)"><svg width="24" height="24"><path d="M16.3 11c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H7.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H8V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h.3zM10 8v3h4V8a1 1 0 0 0-.3-.7A1 1 0 0 0 13 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7z" fill-rule="evenodd"></path></svg></span>
                                             <span class="tox-icon tox-lock-icon__unlock" id="boxunlockID" style="display: block;"  onclick="boxlock(false)"><svg width="24" height="24"><path d="M16 5c.8 0 1.5.3 2.1.9.6.6.9 1.3.9 2.1v3h-2V8a1 1 0 0 0-.3-.7A1 1 0 0 0 16 7h-2a1 1 0 0 0-.7.3 1 1 0 0 0-.3.7v3h.3c.2 0 .3 0 .5.2l.2.6v7.4c0 .3 0 .4-.2.6l-.6.2H4.8c-.3 0-.4 0-.6-.2a.7.7 0 0 1-.2-.6v-7.4c0-.3 0-.4.2-.6l.5-.2H11V8c0-.8.3-1.5.9-2.1.6-.6 1.3-.9 2.1-.9h2z" fill-rule="evenodd"></path></svg></span>
                                        </button>
                                    </div>
                                    <div class="tox-form__group" style="flex: 2;">
                                            <label class="tox-label" for="form-field_597838573111604453101745">设置背景颜色(#666)</label>
                                            <input type="text" tabindex="-1"   onBlur="setboxbg()" data-alloy-tabstop="true" class="tox-textfield" id="boxBgID">
                                    </div>
                                </div>
                            </div>
                       <div class="textareaBox showBox">
                         <div class="tox-form__group tox-form__group--stretched">
                             <label class="tox-label" style="font-size: 18px; padding-left:0px; letter-spacing: 1px;margin-bottom:10px; border-bottom: 1px solid #d6d6d6;" for="form-field_1311027803221604462469765">信息编辑(支持html,禁用【】￥^)</label>
                             <textarea type="text"  class="tox-textarea"  onchange="setBoxHtml()" placeholder="信息标签" id="textID"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <script>
                      function openBox(){
                         if( document.getElementById("setBoxID").className=="setBox tox on") document.getElementById("setBoxID").className="setBox tox";
                          else document.getElementById("setBoxID").className="setBox tox on";
                      }
                        var editor=parent.tinymce.activeEditor;
                        function insCnt(txt){
                            editor.insertContent(txt);
                            parent.tinymce.activeEditor.windowManager.close();
                        }
                    
                        var map, geocoder;
                        var marker; 
                        var lng,lat;
                        var infoBox;
                        function initialize() {
                            parent.tinymceBDBoxHtml=""
                            map = new BMap.Map('map_canvas');
                            var point = new BMap.Point(116.331398,39.897445);
                            map.centerAndZoom(point, 14);
                            map.addControl(new BMap.NavigationControl());
                            map.enableScrollWheelZoom();
                    
                            //根据IP定位
                            var myCity = new BMap.LocalCity();
                            myCity.get(function(result){map.setCenter(result.name);});
                    
                            var gc = new BMap.Geocoder();
                            gc.getLocation(point, function(rs){
                                var addComp = rs.addressComponents;
                                var address = [addComp.city].join('');
                                //console.log(address);
                            });
                                
                         
                        
                            map.addEventListener('click',function(e){
                                //alert(e.point.lng + "," + e.point.lat);
                                lng=e.point.lng;
                                lat=e.point.lat;
                                marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
                                // console.log( map.getZoom())
                                // console.log( map)
                
                                parent.tinymceBDZoom = map.getZoom()
                                map.clearOverlays();
                                map.addOverlay(marker);
                                //insCnt(lng+','+lat);
                                parent.tinymceLng=lng;
                                parent.tinymceLat=lat;
                                // parent.tinymceLat=lat;
                                map.addOverlay(marker); // 将标注添加到地图中
                                 if(!infoBox){setInfoBox();}
                                 else{
                                    infoBox.remove();
                                    setInfoBox();
                                    openCheck.checked ?infoBox.show():'';
                                 }
                
                            });
                
                        
                            document.getElementById('kw').addEventListener('keypress',function(e){
                                if(e.keyCode=='13'){
                                    e.preventDefault();
                                    searchByStationName();
                                }
                            });
                        }
                
                        function setboxbg(){
                            parent.tinymceBDBgColor = document.getElementById("boxBgID").value;
                            if(parent.tinymceBDBgColor) document.getElementById("infoBoxContentID").style.background = parent.tinymceBDBgColor|| "rgba(255,255,255,0.95)";
                            // console.log(parent.tinymceBDBgColor)
                        }
                        function setbdDName(){
                            parent.tinymceBDDName = document.getElementById("bdDNameID").value;
                        }
                        function setInfoBox(){
                                let temHtml = parent.tinymceBDBoxHtml? '<div class="infoBoxContent" id="infoBoxContentID">'+parent.tinymceBDBoxHtml+'<i></i></div>' : '<div class="infoBoxContent" id="infoBoxContentID"><p>信息标签</p> <i></i></div>'
                                infoBox = new BMapLib.InfoBox(map,temHtml,{
                                    boxStyle:{
                                    background:"rgba(255,255,255,0)"
                                    ,width: parent.tinymceBDBoxW || "270px"
                                    ,closeIconMargin: "1px 1px 0 0"
                                    ,enableAutoPan: true
                                    ,align: INFOBOX_AT_TOP
                                }
                                })
                            
                                infoBox.open(marker); 
                                infoBox.hide();
                                if(parent.tinymceBDBgColor) document.getElementById("infoBoxContentID").style.background = parent.tinymceBDBgColor|| "rgba(255,255,255,0.95)";
                            }
                        parent.tinymceBDDH = false;
                        function openDH(){
                            if(document.getElementById("openDHID").checked){
                                parent.tinymceBDDH = document.getElementById("openDHID").checked;
                                document.getElementById("bdDNameID").style.display="block";
                            }else{document.getElementById("bdDNameID").style.display="none";}
                            
                        }
                        parent.tinymceBDSF = false;
                        function openSF(){
                            parent.tinymceBDSF = document.getElementById("openSFID").checked;
                        }
                        
                        let openCheck = document.getElementById('openboxID');
                        function showBOX(){
                            // infoBox.show();
                            if(infoBox){
                                if(openCheck.checked ){
                                     infoBox.show();
                                     document.getElementsByClassName("showBox")[0].setAttribute("name", "show")
                                     document.getElementsByClassName("showBox")[1].setAttribute("name", "show")
                                    
                                }else{ 
                                    infoBox.hide();
                                    document.getElementsByClassName("showBox")[0].setAttribute("name", "hide")
                                     document.getElementsByClassName("showBox")[1].setAttribute("name", "hide")
                                }
                            }else{
                                alert("请先标记地点");
                                openCheck.checked= false;
                            }
                        }
                        function setBoxHtml(){
                            parent.tinymceBDBoxHtml = document.getElementById("textID").value;
                            infoBox.setContent('<div class="infoBoxContent" id="infoBoxContentID"><p>'+parent.tinymceBDBoxHtml+'</p><i></i></div>');
                            if(parent.tinymceBDBgColor) document.getElementById("infoBoxContentID").style.background = parent.tinymceBDBgColor|| "rgba(255,255,255,0.95)";
                        }
                        function searchByStationName() {
                            var localSearch = new BMap.LocalSearch(map);
                            localSearch.enableAutoViewport(); //允许自动调节窗体大小
                            map.clearOverlays();//清空原来的标注
                            var keyword = document.getElementById("kw").value;
                            localSearch.setSearchCompleteCallback(function (searchResult) {
                                // console.log(searchResult);
                                if(searchResult.Ar.length==0){
                                    alert('搜索不到该地区');
                                    return false;
                                }
                                var poi = searchResult.getPoi(0);
                                map.centerAndZoom(poi.point, 14);
                                marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));
                                parent.tinymceLng=poi.point.lng;
                                parent.tinymceLat=poi.point.lat;
                                map.addOverlay(marker);
                                if(!infoBox){setInfoBox();}
                                 else{
                                    infoBox.remove();
                                    setInfoBox();
                                    openCheck.checked ?infoBox.show():'';
                                 }
                
                            });
                            localSearch.search(keyword);
                            return false;
                        }
                    
                        var unFlog = false;
                        let wInput = document.getElementById("wInputID");
                        let hInput = document.getElementById("hInputID");
                        parent.tinymceBDW = wInput.value="100%";
                        parent.tinymceBDH = hInput.value="200px";
                        var boxunFlog = false;
                        let boxwInput = document.getElementById("boxwInputID");
                        let boxhInput = document.getElementById("boxhInputID");
                        parent.tinymceBDBoxW = boxwInput.value="270px";
                        parent.tinymceBDBoxH = boxhInput.value="auto";
                        function lock(o){
                            if(o){
                                document.getElementById("lockID").style.display="none";
                                document.getElementById("unlockID").style.display="block";
                               unFlog = false;
                            }else{
                               document.getElementById("unlockID").style.display="none";
                               document.getElementById("lockID").style.display="block";	
                               unFlog = true;
                            }
                        }
                        function boxlock(o){
                            if(o){
                                document.getElementById("boxlockID").style.display="none";
                                document.getElementById("boxunlockID").style.display="block";
                                boxunFlog = false;
                            }else{
                               document.getElementById("boxunlockID").style.display="none";
                               document.getElementById("boxlockID").style.display="block";	
                               boxunFlog = true;
                            }
                        }
                        function proportion(o1,o2,n1,n2){
                            if(!(/^[0-9]+.?[0-9]*$/.test(n2.value.replace(/px/i,'').replace(/%/,'')))){n2.value="100%"}
                            let proportion = (parseInt(o1)/parseInt(o2))*parseInt(n2.value);
                            !proportion? proportion = 100:'';
                            // console.log(proportion);
                               if(n2.value.match("%")){
                                    n1.value= proportion + '%';
                               }else{
                                  n1.value= proportion + 'px';
                                  n2.value.match('px')?'':n2.value = n2.value+'px'
                              }
                        }
                        function setWHsize(i){
                            if(unFlog){
                                i ? proportion(parent.tinymceBDW,parent.tinymceBDH, wInput, hInput,i) : proportion(parent.tinymceBDH,parent.tinymceBDW, hInput , wInput);
                            }
                            parent.tinymceBDW = wInput.value;
                            parent.tinymceBDH = hInput.value;
                        }
                        function setboxWHsize(i){
                            if(boxunFlog){
                                i ? proportion(parent.tinymceBDBoxW,parent.tinymceBDBoxH, boxwInput, boxhInput,i) : proportion(parent.tinymceBDBoxH,parent.tinymceBDBoxW, boxhInput , boxwInput);
                            }
                            parent.tinymceBDBoxW = boxwInput.value;
                            parent.tinymceBDBoxH = boxhInput.value;
                            infoBox.remove()
                            setInfoBox();
                            infoBox.show();
                            document.getElementById("infoBoxContentID").style.width =  parent.tinymceBDBoxW;
                            document.getElementById("infoBoxContentID").style.height = parent.tinymceBDBoxH;
                            
                        }
                    
                        onbeforeunload = function(){
                            // console.log("1212")
                            parent.tinymceBDW = wInput.value;
                            parent.tinymceBDH = hInput.value;
                            parent.tinymceBDBoxW = boxwInput.value;
                            parent.tinymceBDBoxH = boxhInput.value;
                            parent.tinymceBDBoxHtml = document.getElementById("textID").value;
                            parent.tinymceBDDH = document.getElementById("openDHID").checked;
                            parent.tinymceBDBgColor = document.getElementById("boxBgID").value;
                            parent.tinymceBDSF = document.getElementById("openSFID").checked;
                            parent.tinymceBDDName = document.getElementById("bdDNameID").value;
                        }
                    </script>
                </body>
                </html>
                `
            },
			buttons: [
				{
					type: 'cancel',
					text: 'Close'
				},
				{
					type: 'custom',
					text: 'Save',
					name: 'save',
					primary: true
				},
			],
			onAction: function (api, details) {
			// console.log(api)
				switch (details.name) {
					case 'save':
						tinymceBDBoxHtml = tinymceBDBoxHtml.replace(/\'/g,'￥').replace(/\"/g,'^').replace(/\>/g,'】').replace(/\</g,'【');
						tinymceBDBgColor = 	tinymceBDBgColor.replace(/\#/g,'@').replace(/\(/g,'+').replace(/\)/g,'-');
						html='<iframe name="bdMap" src="'+baseURL+'/plugins/bdmap/bd.html?center='+tinymceLng+'%2C'+tinymceLat+'&zoom='+(tinymceBDZoom?tinymceBDZoom:'14')+'&bwidth='+tinymceBDBoxW+'&bheight='+tinymceBDBoxH+'&boxhtml='+tinymceBDBoxHtml+'&DH='+tinymceBDDH+'&bgColor='+tinymceBDBgColor+'&SF='+tinymceBDSF+'&dName='+tinymceBDDName+'" frameborder="0" style="width:'+tinymceBDW+';height:'+tinymceBDH+'; min-height: 100px;border:#ccc solid 1px;" height="'+tinymceBDH+'" width="'+tinymceBDW+'">';
						editor.insertContent(html);
							tinymceLng='';
							tinymceLat='';
							tinymceBDZoom='';
							tinymceBDW='';
							tinymceBDH='';
							tinymceBDBoxW='';
							tinymceBDBoxH='';
							tinymceBDBoxHtml='';
							tinymceBDDH='';
							tinymceBDSF = '';
							tinymceBDBgColor = '';
							tinymceBDDName = '';
						api.close();
						break;
					default:
						break;
				}
				
			}
		});
	};

	editor.ui.registry.getAll().icons.bdmap || editor.ui.registry.addIcon('bdmap','<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M670.8,733c21.1-46.1,45.6-73.7,64.5-90.5,10.3-9.2,21.1-16.8,32.5-21.7-6-8.1-10.6-15.3-15.2-22.2-8.4-12.6-17.3-27.1-21.7-34.1-28.7,15.7-55.9,48.2-77.5,77-12.5,16.7-23.8,34.7-34.7,53.7l52,37.9zM450.2,803.5c6,14.6,9.2,29.3,13.5,40.6,1.6,7.1,3.2,13.5,5.4,19.5,19.5-6,39-12,58-20.1,32.5-13.6,71-33,95.4-58.5l-45-48.2c-8.1,8.1-17.9,14.7-30.4,22.8-21.1,13.6-51.5,30.4-97,43.9zM373.8,204.1c0-52,43.4-95.4,95.4-95.4,53.7,0,94.8,43.4,94.8,95.4,0,53.6-41.2,95.4-94.8,95.4-52,0-95.4-41.7-95.4-95.4zm-105.7,0c0,20.1,2.7,39.6,8.7,58.5h-2.2c16.8,39,35.8,79.9,52,111.1l27.1,52c47.5,91.2,105.7,191.3,114.3,204.3,1.1,0,0.547,0,1.1,1.1,32.5-54.7,60.6-104.1,81.8-143.6l34.1-63.4,26.6-52c15.8-30.9,34.7-71,51.5-110.6h-1.6c6-19,8.7-38.5,8.7-58.5,0-110.6-90.5-200.5-201.1-200.5-111.1,0-201.1,90-201.1,200.5zM229.6,800.2c15.2,11.4,31.3,21.3,48.2,30.4,30.2,16,68.8,34.1,112.7,40.7,1.6-13.1,2.5-29.9,4.3-42.3l3.3-21.7c-11.9-2.2-25.6-5.6-40.1-10.8-24.5-8.8-55.8-23.8-90.5-48.2-9.2,13.5-18.6,25.7-26,35.8l-11.9,16.3zM17.2,949.8c0,41.2,33.6,74.2,74.2,74.2H932.5a74,74,0,0,0,74.2-74.2V336.9A74,74,0,0,0,932.5,262.6H728.2L692.4,362.9H894.6c9.2,0,15.7,6,15.7,15.2V511.4c-28.7-0.531-73.2,2.2-116.5,23.3l5.4,14.6,17.3,45c25.5-8.1,47.7-14.2,65-16.8l28.7-4.3V911.9c0,9.2-6.5,15.1-15.7,15.1H133.2c-9.2,0-15.7-5.9-15.7-15.1V704.8a261.1,261.1,0,0,0,15.2,14.1c9.3,8,23.3,21.1,41.2,36.3,10.3-9.2,20-21.2,28.2-29.8,4.8-5,9.2-9.8,13-14.6-42.8-35.8-86.2-86.2-97.5-100.3V378c0-8.7,6.5-15.2,15.7-15.2h53L209.5,262.5H91.4c-40.7,0-74.2,33.1-74.2,74.3V949.7z"/></svg>');
	
	editor.ui.registry.addButton('bdmap', {
		icon: 'bdmap',
        tooltip: pluginName,
		onAction: function() {
			openDialog();
		}
	});
	editor.ui.registry.addMenuItem('bdmap', {
		text: pluginName,
		onAction: function() {
			openDialog();
		}
	});
	return {
		getMetadata: function() {
			return  {
				name: pluginName,
				url: "https://github.com/Five-great/tinymce-plugins",
			};
		}
	};
});
