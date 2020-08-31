import React from 'react';


export default ({ comments }) => {

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {
        comments.map((comment, index) => (
          <div
            style={{ width: '100%', marginBottom: '20px', border: '1px rgba(0, 0, 0, 0.1) solid', padding: '10px 20px' }}
            key={comment.id}
            className="card"
          >
            <div className="card-body">
              <p className="card-text">{`${index + 1}.) ${comment.status === 'approved' ? comment.content : comment.status === 'pending' ? 'Awaiting approval' : 'Comment rejected'}.`}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}
