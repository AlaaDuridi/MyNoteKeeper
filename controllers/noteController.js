const Note = require('./../models/noteModel');

const getAllNotes = async (req, res) => {
  let { page, per_page, search } = req.query;

  try {
    page = parseInt(page, 10) || 1;
    perPage = parseInt(per_page, 10) || 2;

    const matchStage = {};
    const excludedFields = ['page', 'per_page', 'search'];

    // Exclude pagination and search fields from filtering
    Object.keys(req.query).forEach(field => {
      if (!excludedFields.includes(field)) {
        matchStage[field] = req.query[field];
      }
    });

    // Search logic
    if (search) {
      const normalizedSearch = search.trim().replace(/\s+/g, ' ');
      matchStage.$text = { $search: normalizedSearch  }; 
    }

    // Aggregation pipeline with facet for pagination and metadata
    const notes = await Note.aggregate([
      { $match: matchStage },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [{ $skip: (page - 1) * perPage }, { $limit: perPage }],
        },
      },
    ]);

    // Handle edge cases where there are no results
    const totalCount = notes[0]?.metadata[0]?.totalCount || 0;

    // Send the response
    return res.status(200).json({
      success: true,
      notes: {
        metadata: { totalCount, page, perPage },
        data: notes[0].data,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve notes',
      error: err.message,
    });
  }
};



const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        note
      },
    });
  }
  catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};


const createNote = async (req, res) => {
try {
  const note = await Note.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      note
    }
  })
}
catch(err){
  res.status(400).json({
    status: 'fail',
    message: err
  })
}

};

const updateNote = async (req, res) => {
 try {
   const note = await Note.findByIdAndUpdate(req.params.id, req.body,{
     new: true,
     runValidators: true
   });

   res.status(200).json({
     status: 'success',
     data: {
       note
     },
   });
 }
 catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    })
 }
};

const deleteNote = async (req, res) => {
try {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
}
catch(err) {
  res.status(404).json({
    status: 'fail',
    message: err
  });
}
};


module.exports = { getAllNotes, getNote, createNote, updateNote, deleteNote};