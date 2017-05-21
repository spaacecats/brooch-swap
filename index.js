
const	TRIGGER_ITEM = 6560,     // minor replenishment potable
		primaryBrooches = [51028,51011]   // 51028 - marrow, 51011 - quatrefoil
		secondaryBrooch = [19706]  // quickcarve
		
module.exports = function broochSwap(dispatch){
	let	cid,
		location,
		secondaryBroochSlot,
		primaryBroochSlot;
	
	dispatch.hook('S_LOGIN', 1, event =>{cid = event.cid})
	dispatch.hook('C_PLAYER_LOCATION', 1, event =>{location = event})
	dispatch.hook('C_USE_ITEM', 1, event =>{
		if(event.item == TRIGGER_ITEM){
			dispatch.toServer('C_EQUIP_ITEM', 1,{
			cid: cid,
			slot: secondaryBroochSlot,
			unk: 0
		})
		timeout = setTimeout(broochSwap,200)
		}
	})
		
	dispatch.hook('S_INVEN', 3, event =>{
		for ( var i = 0; i < event.items.length; i++) {
			if (primaryBrooches.includes (event.items[i].item)) {
				primaryBroochSlot = event.items[i].slot;
			}
			if (secondaryBrooches.includes (event.items[i].item)) {
				secondaryBroochSlot = event.items[i].slot;
			}
		}
	})
	
	function broochSwap(){
		clearTimeout(timeout)
		dispatch.toServer('C_USE_ITEM', 1,{
			ownerId: cid,
			item: secondaryBrooch,
			id: 0,
			unk1: 0,
			unk2: 0,
			unk3: 0,
			unk4: 1,
			unk5: 0,
			unk6: 0,
			unk7: 0,
			x: location.x1,
			y: location.y1,
			z: location.z1,
			w: location.w,
			unk8: 0,
			unk9: 0,
			unk10: 0,
			unk11: 1
		})
		dispatch.toServer('C_EQUIP_ITEM', 1,{
			cid: cid,
			slot: primaryBroochSlot,
			unk: 0
		})
	}
}
