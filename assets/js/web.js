    /**
         * 获取链接后参数
         * @param name 参数名
         * @returns {*} value
         * @constructor
         */
        function getQueryString(key){
            var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
            var result = window.location.search.substr(1).match(reg);
            return result?decodeURIComponent(result[2]):null;
        }
        /**
         * 锚点到指定位置
         * @param {*当前节点ele} ele 注意当前节点添加
         */
        function reachToPoint(ele){
            var id=ele.attr("data-id");
            if($(id).length != 0){
                var top=$(id).offset().top - 70 + 'px';
                $('html').animate({scrollTop:top},500);
                $('body').animate({scrollTop:top},500);
            }
        };

        // ajax function
        function ajaxRequest(url,type,data,successFun,$self,confirmSelf){
            if(!data.product_id){
                
            };
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                url : url,
                type: type,
                data:data,
                success: function(res) {
                    if (confirmSelf) {
                        confirmSelf.attr('disabled',false);
                    }
                    if(res.retcode != undefined){
                        if (res.retcode == 1) {
                            successFun(res,$self);

                        }else{
                            alert(res.info);
                        }
                    }else{
                        successFun(res,$self);
                    }
                },
                error: function(res) {
                    if (confirmSelf) {
                        confirmSelf.attr('disabled',false);
                    }
                    alert(res.info);
                }
            });  
        };

        //获取当前界面的地址
        function GetLocalLink() {
            var sLocalLink=window.location.href;
            var reg=/\?/;
            if(reg.test(sLocalLink)){
                var sCurPageLinkPre=sLocalLink.split("?")[0];
            }else{
                var sCurPageLinkPre=sLocalLink;
            };    
            return sCurPageLinkPre;
        };
        /**
         * 
         * @param {*是一个key + value 的组合搜索对象} keyValues 
         */
        function GoToLinkAll(keyValues) {//这个是用来进行筛选搜索的
            sCurPageLinkPre=GetLocalLink();
            
            var keys = Object.keys(keyValues);
            var keyStrs = '?';
            for(var k=0; k<keys.length; k++){
                var key = keys[k];
                keyStrs = keyStrs + key + '=' + keyValues[key] +'&';
            };
            
            keyStrs = keyStrs.substring(0,keyStrs.lastIndexOf('&'));
            window.location.href = sCurPageLinkPre + keyStrs;
         
        };

        //cookie
        function setCookie(cname,cvalue,exdays){//设置cookie
            var d = new Date();
            d.setTime(d.getTime()+(exdays*24*60*60*1000));
            var expires = "expires="+d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;

        };
        function getCookie(cname){//获取cookie
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);
            }
            return "";
        };

        function delCookie(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        };
