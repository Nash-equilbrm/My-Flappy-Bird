

var ConnectState = function(){}
ConnectState.DISCONNECTED = 0;
ConnectState.CONNECTING = 1;
ConnectState.CONNECTED = 2;
ConnectState.NEED_QUIT = 3;             // state khi client da disconnect va thong bao cho GUI hien tai de disconnect

var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

var EVENT_CONNECT_SUCCESS = 0;
var EVENT_CONNECT_ERROR = 3;

var EVENT_DISCONNECT = 1;
var EVENT_RECEIVED = 2;

// socketweb native
var WebsocketClient = cc.Class.extend({
    ctor: function(){
        this.listener = null;
        this.ws = null;


        if(!cc.sys.isNative)
        {
            cc.director.getScheduler().scheduleUpdate(this,0,false);

        }
        this.data = [];
        this.event = -1;

    },
	getHandshakeRequest: function()
	{
		var obj = {};
		obj.c = 0;
		obj.a = 0;
		obj.p = {};
		obj.p["cl"] = "JavaScript";
		obj.p["api"] = "1.2.0";
		
		return JSON.stringify(obj);
	},
	handleHandshake: function(){
	},

    update: function(){
        this.dispatchEvent();
    },
    dispatchEvent: function(event)
    {
        if(this.event == EVENT_CONNECT_SUCCESS)
        {
            if(this.listener && this.listener.onFinishConnect)
            {
                this.listener.target = this;
                this.listener.onFinishConnect.call(this.listener,true);
            }
            this.event = -1;
        }
        else if(this.event == EVENT_CONNECT_ERROR)
        {
            if(this.listener && this.listener.onFinishConnect)
            {
                this.listener.target = this;
                this.listener.onFinishConnect.call(this.listener,false);
            }
        }
        else if(this.event == EVENT_DISCONNECT)
        {
            if(this.listener && this.listener.onDisconnected)
            {
                this.listener.target = this;
                this.listener.onDisconnected.call(this.listener);
            }
            this.event = -1;
        }

        if(this.data.length > 0)
        {
            var data = this.data[0];
            if(this.listener && this.listener.onReceived)
            {
                this.listener.onReceived.call(this.listener,0,data);
            }
            this.data.splice(0,1);
        }
    },
    connect: function(host,port,isSsl)
    {
        this.ws = new WebSocket("ws" + (isSsl?"s":"") + "://"+host+":"+port+"/websocket");
        this.ws.binaryType = "arraybuffer";
		this.ws.onopen = this.onSocketConnect.bind(this);
		this.ws.onclose = this.onSocketClose.bind(this);
		this.ws.onmessage = this.onSocketData.bind(this);
		this.ws.onerror = this.onSocketError.bind(this);

    },
	onSocketConnect : function(){
        this.event = EVENT_CONNECT_SUCCESS;

	},
	onSocketClose: function(){
		cc.log("CONNECT CLOSED");
        this.event = EVENT_DISCONNECT;
	},
	onSocketData: function(a){
        var data = new Uint8Array(a.data);
        this.data.push(data);
	},
	onSocketError: function(){
		cc.log("error connect");
        this.event = EVENT_CONNECT_ERROR;

	},
	send: function(packet){
        var data = new Int8Array(packet._length);
        for(var i=0;i<packet._length;i++)
        {
            data[i] = packet._data[i];
        }
		this.ws.send(data.buffer);
	}
	
})
