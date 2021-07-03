import { createStore } from 'vuex'

interface Friend {
	id: number;
	name: string;
	surpriseFriend: string;
}

export default createStore({
	state: {
		friends: [] as Friend[],
		idCount: 0,
	},
	mutations: {
		add (state, friend: Friend) {
				state.idCount++;
				state.friends.push({...friend,...{id: state.idCount}});
				state.friends = [...state.friends];
		},
		remove (state, name: string) {
			const friendIndex = state.friends.findIndex(friend => friend.name === name);
			if(friendIndex > -1){
				state.friends.splice(friendIndex,1);
				state.friends = [...state.friends];
			}
		},
		shuffle (state) {
			const friendsIndexList = state.friends.map((item, index) => index);

			if(friendsIndexList.length < 3){
				return;
			}

			const shuffleList = (list: number[]) => list.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
			let shuffledFriendsIndexList = shuffleList(friendsIndexList);
			const hasCollision = (shuffledList: number[]) => {
				return friendsIndexList.some(index => index === shuffledList[index]);
			}

			while(hasCollision(shuffledFriendsIndexList)){
				shuffledFriendsIndexList = shuffleList(friendsIndexList);
			}

			friendsIndexList.forEach(friendIndex => {
				state.friends[friendIndex].surpriseFriend = state.friends[shuffledFriendsIndexList[friendIndex]].name;
			});
		}
	},
	actions: {
	},
	modules: {
	},
	getters: {
		friends: state => state.friends
	}
})
