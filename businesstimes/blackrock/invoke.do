var tk = '762cce43c5b4fb68e876b4f013d69022'; var adid = '2662843182471293074'; (function() { var mt = function(trackers) { var ct = '{ "destinationUrl" : "" , "clickTracker" : { } , "servedImp" : { "tracker01" : { "value" : "https://ad.doubleclick.net/ddm/trackimp/N1112570.3771154SPHDIRECT/B25026323.290002700;dc_trk_aid=483613284;dc_trk_cid=135044775;ord=##BZ_CACHEBUSTER##;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;" , "type" : "Image"}} , "renderedImp" : { } , "trackerFireOn" : "Clickthrough" , "clkThruUrls" : { "ucyA3BLCriS" : "https://ad.doubleclick.net/ddm/trackclk/N1112570.3771154SPHDIRECT/B25026323.290002700;dc_trk_aid=483613284;dc_trk_cid=135044775;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;"} , "clkThruTrackers" : { } , "viewabilityViaDelivery" : true}'; if (ct == "") return trackers; try { var bonzai_cb = Math.random(); ct = ct.replace(/##BZ_CACHEBUSTER##/g, bonzai_cb); ct = JSON.parse(ct); var macros = {}; if (trackers['network'] && trackers['network']['macros']) macros = trackers.network.macros; if (ct['clickTracker']) for (var t in ct.clickTracker) { var tr = ct.clickTracker[t]; if (tr) { if (!macros['clkTr']) macros['clkTr'] = { "img": [], "scr": [] }; if (tr.type == "Image") macros.clkTr.img.push(tr.value); else if (tr.type == "Script") macros.clkTr.scr.push(tr.value); } } if (ct['servedImp']) for (var t in ct.servedImp) { var tr = ct.servedImp[t]; if (tr) { if (!macros['imprTr']) macros['imprTr'] = { "img": [], "scr": [] }; if (tr.type == "Image") macros.imprTr.img.push(tr.value); else if (tr.type == "Script") macros.imprTr.scr.push(tr.value); } } if (ct['renderedImp']) for (var t in ct.renderedImp) { var tr = ct.renderedImp[t]; if (tr) { if (!macros['rendTr']) macros['rendTr'] = { "img": [], "scr": [] }; if (tr.type == "Image") macros.rendTr.img.push(tr.value); else if (tr.type == "Script") macros.rendTr.scr.push(tr.value); } } if (ct['engagment']) for (var t in ct.engagment) { var tr = ct.engagment[t]; if (tr) { if (!macros['engmTr']) macros['engmTr'] = { "img": [], "scr": [] }; if (tr.type == "Image") macros.engmTr.img.push(tr.value); else if (tr.type == "Script") macros.engmTr.scr.push(tr.value); } } if (ct['destinationUrl']) { if (!macros['clkThru']) macros['clkThru'] = { "landingUrl": "" }; macros.clkThru.landingUrl = ct.destinationUrl; } if (ct['clkThruUrls']) { macros.clkThruUrls = ct['clkThruUrls']; } if (ct['clkThruTrackers']) { macros.clkThruTrackers = ct['clkThruTrackers']; } if (ct['trackerFireOn']) { trackers['network']["settings"]["trackerFireOn"] = ct['trackerFireOn']; } if (ct['viewabilityViaDelivery']) { if (ct['moat'] && ct['moat'].v) { var tagType = ct['moat'].t === "img" ? "img" : "script"; var moatScript = document.createElement(tagType); moatScript.src = ct["moat"].v; script.parentNode.appendChild(moatScript); } if (ct['ias'] && ct['ias'].v) { var tagType = ct['ias'].t === "img" ? "img" : "script"; var iasScript = document.createElement(tagType); iasScript.src = ct["ias"].v; script.parentNode.insertBefore(iasScript, script.parentNode.firstChild); } } else { if (!trackers['network']['viewability']) { trackers['network']['viewability'] = []; } if (ct['moat'] && ct["moat"].v && ct['moat'].t === "scr") { trackers['network']['viewability'].push(ct['moat'].v); } if (ct['ias'] && ct['ias'].v && ct['ias'].t === "scr") { trackers['network']['viewability'].push(ct['ias'].v); } } trackers['network']['macros'] = macros; } catch (e) {} return trackers; }; var mode = 'live'; var protocol = 'https'; var reqJson = '{"sn":["DFP (PG)"],"adid":["2662843182471293074"],"scriptid":["bonzai_script_0"],"ssa":["true"],"plid":["2660335583498705326"],"rnd":["1466168936"],"tk":["762cce43c5b4fb68e876b4f013d69022"],"proto":["https"]}'; var bpList = []; var cUrl = protocol + "://collector.bonzai.co"; var asPath = protocol + "://massets.bonzai.ad"; var scriptLoaded = false; var script = document.getElementById('bonzai_script_0'); var adDiv = document.createElement('div'); try { bpList = JSON.parse('[{"id":"itrst_main","label":"1366x624","width":1366,"height":624}]'); } catch (e) { bpList = []; }; adDiv.className = 'mizu-ad ' + '2662843182471293074_0'; var c = '{clickurl}'; var sticky = ''; var me = script; script.parentNode.insertBefore(adDiv, script.nextSibling); var currentBp = getCBp(bpList); var qP = '&tk=' + tk + '&ad=' + adid; if (currentBp) qP += '&brkp=' + currentBp.label + '&brkpid=' + currentBp.id + '&cw=' + currentBp.cw + '&ch=' + currentBp.ch; var prepreimp = new Image(); prepreimp.src = cUrl + '/rec?ev=pre-preimp' + qP; var winBonzaiObj = undefined; if (window.bonzaiObj != undefined) winBonzaiObj = window.bonzaiObj['bonzai_script_0']; if (winBonzaiObj != undefined && winBonzaiObj != "") { winBonzaiObj = JSON.parse(winBonzaiObj); winBonzaiObj = mt(winBonzaiObj); window.bonzaiObj['bonzai_script_0'] = JSON.stringify(winBonzaiObj); if (winBonzaiObj['network'] != undefined && winBonzaiObj['network']['macros'] != undefined && winBonzaiObj['network']['macros']['imprTr'] != undefined) { var impTrackers = winBonzaiObj['network']['macros']['imprTr']; if (impTrackers.img.length != 0) { var imgTrk = impTrackers.img; for (itr = 0; itr < imgTrk.length; itr++) { try { (new Image()).src = imgTrk[itr]; } catch (e) {} } } if (impTrackers.scr.length != 0) { var srcTrk = impTrackers.scr; for (itr = 0; itr < srcTrk.length; itr++) { try { var srcObj = document.createElement('script'); srcObj.src = srcTrk[itr]; adDiv.appendChild(srcObj); } catch (e) {} } } } } if (typeof m_trackers != 'undefined' && m_trackers.a != undefined && m_trackers.a.length > 0) { for (i = 0; i < m_trackers.a.length; i++) { if (m_trackers.a[i]["t"] == "img") { (new Image()).src = m_trackers.a[i]["l"]; } else if (m_trackers.a[i]["t"] == "script") { var mScript = document.createElement('script'); mScript.src = m_trackers.a[i]["l"]; adDiv.appendChild(mScript); } } } var req = document.createElement('script'); req.id = 'mizu-' + (Math.random() + '').slice(2); var iescriptready = false; req.onreadystatechange = function() { if ((req.readyState == 'loaded' || req.readyState == 'complete') && !iescriptready) { iescriptready = true; scriptLoaded = true; var preimp = new Image(); preimp.src = cUrl + '/rec?ev=preimp' + qP; if (typeof m_trackers != 'undefined' && m_trackers.b != undefined && m_trackers.b.length > 0) { for (i = 0; i < m_trackers.b.length; i++) { if (m_trackers.b[i]["t"] == "img") { (new Image()).src = m_trackers.b[i]["l"]; } else if (m_trackers.b[i]["t"] == "script") { var mScript = document.createElement('script'); mScript.src = m_trackers.b[i]["l"]; adDiv.appendChild(mScript); } } } if (typeof(loadAd) === "function") loadAd('2662843182471293074_0', reqJson); } }; req.onload = function() { scriptLoaded = true; var preimp = new Image(); preimp.src = cUrl + '/rec?ev=preimp' + qP; if (typeof m_trackers != 'undefined' && m_trackers.b != undefined && m_trackers.b.length > 0) { for (i = 0; i < m_trackers.b.length; i++) { if (m_trackers.b[i]["t"] == "img") { (new Image()).src = m_trackers.b[i]["l"]; } else if (m_trackers.b[i]["t"] == "script") { var mScript = document.createElement('script'); mScript.src = m_trackers.b[i]["l"]; adDiv.appendChild(mScript); } } } if (typeof(loadAd) === "function") loadAd('2662843182471293074_0', reqJson); }; req.src = "https://massets.bonzai.ad/2662843182471293074_1607303354434_script.js"; adDiv.appendChild(req); function getCBp(bps) { function Vector(x, y) { return { x: x, y: y }; }; Vector.mag = function(v) { return Math.sqrt(v.x * v.x + v.y * v.y); }; Vector.dot = function(v1, v2) { return v1.x * v2.x + v1.y * v2.y; }; Vector.sub = function(v1, v2) { return { x: v1.x - v2.x, y: v1.y - v2.y }; }; Vector.distance = function(v1, v2) { return Vector.mag(Vector.sub(v1, v2)); }; Vector.cosineSimilarity = function(v1, v2) { return Vector.dot(v1, v2) / (Vector.mag(v1) * Vector.mag(v2)); }; var similarity = function(v1, v2) { return 1 / Vector.cosineSimilarity(v1, v2); }; function bpToVector(bp) { return Vector(bp.width, bp.height); }; function sortBpsOnSimilarity(slot, bps) { return bps.map(function(bp) { return [similarity(slot, bpToVector(bp)), bp]; }).sort(function(a, b) { return a[0] - b[0]; }); }; var rootIframeDimensions = getRootIfD(); function addAdcDims(sltBp) { sltBp.cw = rootIframeDimensions.width; sltBp.ch = rootIframeDimensions.height; return sltBp; }; var slot = Vector(rootIframeDimensions.width, rootIframeDimensions.height); if (bps) { if (bps.length > 1) { return addAdcDims(sortBpsOnSimilarity(slot, bps)[0][1]); } else if (bps.length == 1) { return addAdcDims(bps[0]); } }; return null; }; function getRootIfD() { if (window.$sf && window.$sf.ext && typeof window.$sf.ext.geom === "function") { var container = window.$sf.ext.geom().self; if (container && container.w) { return { width: container.w, height: container.h }; } } var rootIframe = getRootIf(); if (rootIframe === window) { var mainInvocArr = document.getElementsByClassName('2662843182471293074_0'); if (mainInvocArr && mainInvocArr.length > 0) { rootIframe = mainInvocArr[0].parentNode && mainInvocArr[0].parentNode.parentNode; } } var cnType = rootIframe === window || (rootIframe.nodeName && rootIframe.nodeName === "BODY"); return { width: cnType ? window.innerWidth : rootIframe.clientWidth, height: cnType ? window.innerHeight : rootIframe.clientHeight }; } function getRootIf() { var i = getWP(); var rootIframe = window; try { if (i && !i.frameElement && rootIframe.frameElement) { rootIframe = rootIframe.frameElement; } else { while (i && i.frameElement) { rootIframe = i.frameElement; i = i.parent; } } } catch (e) { return rootIframe; } return rootIframe; } function getWP() { var rJ = JSON.parse(reqJson); if (rJ && rJ.contType && rJ.contType === "div") { return window; } else { try { return window.parent; } catch (e) { return window; } } }; try { var hostName = window.top.location.hostname; var pageName = window.top.location.pathname; var domainNameTracker = new Image(); domainNameTracker.src = "https://collector.bonzai.co/rec?mode=test&adid=2662843182471293074&tk=762cce43c5b4fb68e876b4f013d69022&domain="+hostName+"&pagename="+pageName; } catch (e) { new Image().src="https://collector.bonzai.co/rec?mode=test&adid=2662843182471293074&tk=762cce43c5b4fb68e876b4f013d69022&domain=domainnamenotfound"; } })();