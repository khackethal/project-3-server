import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'

import User from '../models/user.js'
import userData from '../db/data/userData.js'

import Memory from '../models/memory.js'
import memoryData from '../db/data/memoryData.js'

async function seedDatabase() {
  try {
    // * connect 
    await connectToDb()
    console.log('⭐ Successfully connected to mongo') 

    // * seed database with users
    const user = await User.create(userData)
    console.log(`✨ ${user.length} users added! ${user}`)

    // * Assign a user's user ID to each memory - same user for ech intial seed or we need to write more logic
    const memoryDataWithUsers = memoryData.map(memory =>  {
      return { 
        ...memory,
        user: {
          userId: user[1]._id,
          username: user[1].username,
        },
      }
    })

    // * seed database with memories
    const memories = await Memory.create(memoryDataWithUsers)
    console.log(`✨ ${memories.length} memories created!`)

    // ! If we want to seed with a comment- need to amend comment structure
    // const myComment = {
    //   text: 'Great memory',
    //   user: user[1]._id ,
    // }

    // const memoryWithComment = memories[0]
    // memoryWithComment.comments.push(myComment)
    // const final = await memoryWithComment.save()

    //! ///////-----------------

    // * Disconnect once finished
    await mongoose.connection.close()
    console.log('✅ Disconnected from mongo. All done!')

  } catch (e) {
    console.log('🤖 Something went wrong')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDatabase()