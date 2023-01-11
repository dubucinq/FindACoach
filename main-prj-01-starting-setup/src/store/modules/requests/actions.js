export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
      //coachId: payload.coachId,
      //id: new Date().toISOString(),
    };

    const response = await fetch(
      `https://vue-http-demo-58d0b-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST', // Dont override data. Returns an ID
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    newRequest.id = responseData.name; // Firebase name is the Id
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
  
    if(!context.getters.shouldUpdate){
        return ;
    }

    const token = context.rootGetters.token;
    const coachId = context.rootGetters.userId;
    const response = await fetch(`https://vue-http-demo-58d0b-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const req = {
        id: key,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
        coachId: coachId,
      };
      requests.push(req);
    }

    context.commit('setRequests', requests);
    context.commit('setFetchTimestamp');
  },
};
