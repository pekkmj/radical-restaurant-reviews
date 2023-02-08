class VoteSerializer {
  static getSummary(vote) {
    const allowedAttributes = ['value']

    let serializedVote = {}
    for (const attribute of allowedAttributes) {
      serializedVote[attribute] = vote[attribute]
    }

    return serializedVote
  }

  static getTotalSummary(votes, currentUserId) {
    const currentUserVote = votes.find(vote => vote.userId === currentUserId)
    const serializedUserVote = currentUserVote ? VoteSerializer.getSummary(currentUserVote) : false
    const score = votes.reduce((totalScore, currentVote) => totalScore + currentVote.value, 0) - (serializedUserVote? serializedUserVote.value : 0)
    
    return { score: score, currentUserVote: serializedUserVote }
  }
  
}

export default VoteSerializer