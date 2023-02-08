class VoteSerializer {
  static getSummary(vote) {
    const allowedAttributes = ['voteValue']

    let serializedVote = {}
    for (const attribute of allowedAttributes) {
      serializedVote[attribute] = vote[attribute]
    }

    return serializedVote
  }

  static getTotalSummary(votes, currentUserId) {
    const currentUserVote = votes.find(vote => vote.userId === currentUserId)
    const serializedUserVote = currentUserVote? VoteSerializer.getSummary(currentUserVote) : false
    const score = votes.reduce((totalScore, currentVote) => totalScore + currentVote.voteValue, 0) - (serializedUserVote? serializedUserVote.voteValue : 0)
    
    return { score: score, currentUserVote: serializedUserVote }
  }
  
}

export default VoteSerializer