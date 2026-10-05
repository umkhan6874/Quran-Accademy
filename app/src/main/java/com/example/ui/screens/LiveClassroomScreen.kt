package com.example.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.Send
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.repository.QuranData
import com.example.ui.MainViewModel
import com.example.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LiveClassroomScreen(
    viewModel: MainViewModel,
    onLeaveClass: () -> Unit
) {
    val state by viewModel.classroomState.collectAsState()
    val profile by viewModel.userProfile.collectAsState()
    val surah = QuranData.surahs.first() // Al-Fatihah
    val ayahs = QuranData.ayahsMap[1] ?: emptyList()

    var chatInput by remember { mutableStateOf("") }
    var showLeaveDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(10.dp)
                                .clip(CircleShape)
                                .background(Color(0xFF00E676))
                        )
                        Column {
                            Text(
                                text = "Live Quran Classroom",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "Sheikh Ahmad Al-Masri • 28:15 Left",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                },
                navigationIcon = {
                    IconButton(onClick = { showLeaveDialog = true }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Exit")
                    }
                },
                actions = {
                    Button(
                        onClick = { showLeaveDialog = true },
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier.padding(end = 8.dp).testTag("end_class_btn")
                    ) {
                        Text("End Class", fontSize = 12.sp)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.surface)
            )
        },
        bottomBar = {
            // Video / Mic / Controls Dock
            Surface(
                color = MaterialTheme.colorScheme.surface,
                tonalElevation = 10.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp, vertical = 12.dp)
                        .navigationBarsPadding(),
                    horizontalArrangement = Arrangement.SpaceEvenly,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    // Mic toggle
                    FilledIconButton(
                        onClick = { viewModel.toggleMic() },
                        colors = IconButtonDefaults.filledIconButtonColors(
                            containerColor = if (state.isMicMuted) MaterialTheme.colorScheme.error else EmeraldContainer
                        ),
                        modifier = Modifier.testTag("classroom_toggle_mic_btn")
                    ) {
                        Icon(
                            imageVector = if (state.isMicMuted) Icons.Default.MicOff else Icons.Default.Mic,
                            contentDescription = "Mic",
                            tint = if (state.isMicMuted) Color.White else EmeraldPrimary
                        )
                    }

                    // Camera toggle
                    FilledIconButton(
                        onClick = { viewModel.toggleCamera() },
                        colors = IconButtonDefaults.filledIconButtonColors(
                            containerColor = if (!state.isCameraOn) MaterialTheme.colorScheme.error else EmeraldContainer
                        ),
                        modifier = Modifier.testTag("classroom_toggle_camera_btn")
                    ) {
                        Icon(
                            imageVector = if (state.isCameraOn) Icons.Default.Videocam else Icons.Default.VideocamOff,
                            contentDescription = "Camera",
                            tint = if (!state.isCameraOn) Color.White else EmeraldPrimary
                        )
                    }

                    // Raise Hand
                    FilledIconButton(
                        onClick = { viewModel.toggleRaiseHand() },
                        colors = IconButtonDefaults.filledIconButtonColors(
                            containerColor = if (state.isHandRaised) GoldSecondary else MaterialTheme.colorScheme.surfaceVariant
                        ),
                        modifier = Modifier.testTag("classroom_raise_hand_btn")
                    ) {
                        Icon(
                            imageVector = Icons.Default.FrontHand,
                            contentDescription = "Raise Hand",
                            tint = if (state.isHandRaised) Color.White else MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(MaterialTheme.colorScheme.background),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            // Video Panels (Teacher & Student)
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    // Teacher Video Window
                    Card(
                        modifier = Modifier
                            .weight(1.3f)
                            .height(130.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = EmeraldDark)
                    ) {
                        Box(modifier = Modifier.fillMaxSize()) {
                            Column(
                                modifier = Modifier
                                    .align(Alignment.Center)
                                    .padding(8.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(44.dp)
                                        .clip(CircleShape)
                                        .background(EmeraldContainer),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        Icons.Default.School,
                                        contentDescription = null,
                                        tint = EmeraldPrimary,
                                        modifier = Modifier.size(24.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(
                                    text = "Sheikh Ahmad",
                                    color = Color.White,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                                Text(
                                    text = "🎙️ Speaking (Tajweed)",
                                    color = GoldLight,
                                    fontSize = 10.sp
                                )
                            }

                            // Live badge
                            Surface(
                                shape = RoundedCornerShape(6.dp),
                                color = Color.Red,
                                modifier = Modifier
                                    .align(Alignment.TopStart)
                                    .padding(8.dp)
                            ) {
                                Text(
                                    text = "TUTOR",
                                    color = Color.White,
                                    fontSize = 9.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }
                    }

                    // Student Video Window
                    Card(
                        modifier = Modifier
                            .weight(1f)
                            .height(130.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                    ) {
                        Box(modifier = Modifier.fillMaxSize()) {
                            Column(
                                modifier = Modifier
                                    .align(Alignment.Center)
                                    .padding(8.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(44.dp)
                                        .clip(CircleShape)
                                        .background(if (state.isCameraOn) EmeraldPrimary else MaterialTheme.colorScheme.outline),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = if (state.isCameraOn) Icons.Default.Face else Icons.Default.VideocamOff,
                                        contentDescription = null,
                                        tint = Color.White,
                                        modifier = Modifier.size(24.dp)
                                    )
                                }
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(
                                    text = profile.name,
                                    style = MaterialTheme.typography.titleSmall,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp
                                )
                                Text(
                                    text = if (state.isMicMuted) "Muted" else "Mic On",
                                    fontSize = 10.sp,
                                    color = if (state.isMicMuted) MaterialTheme.colorScheme.error else SuccessGreen
                                )
                            }

                            if (state.isHandRaised) {
                                Surface(
                                    shape = RoundedCornerShape(6.dp),
                                    color = GoldSecondary,
                                    modifier = Modifier
                                        .align(Alignment.TopEnd)
                                        .padding(8.dp)
                                ) {
                                    Text(
                                        text = "✋ Hand Raised",
                                        color = Color.White,
                                        fontSize = 9.sp,
                                        fontWeight = FontWeight.Bold,
                                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // Shared Quran Reading Screen
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(2.dp)
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "SHARED MUSHAF SCREEN",
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = EmeraldPrimary,
                                letterSpacing = 1.sp
                            )
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = EmeraldContainer
                            ) {
                                Text(
                                    text = "Surah Al-Fatihah",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = OnEmeraldContainer,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(12.dp))

                        // Ayahs with interactive pointer
                        ayahs.forEach { ayah ->
                            val isHighlighted = ayah.ayahNumber == state.currentAyahHighlight
                            Surface(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(vertical = 4.dp)
                                    .clickable { viewModel.highlightClassAyah(ayah.ayahNumber) },
                                shape = RoundedCornerShape(10.dp),
                                color = if (isHighlighted) GoldContainer else Color.Transparent,
                                border = if (isHighlighted) androidx.compose.foundation.BorderStroke(1.5.dp, GoldDark) else null
                            ) {
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(8.dp),
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    if (isHighlighted) {
                                        Text(
                                            text = "👉 Teacher Highlighting",
                                            fontSize = 10.sp,
                                            fontWeight = FontWeight.Bold,
                                            color = OnGoldContainer
                                        )
                                    } else {
                                        Text(text = "${ayah.ayahNumber}.", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                                    }

                                    Text(
                                        text = ayah.arabicText,
                                        fontSize = 18.sp,
                                        fontWeight = FontWeight.Bold,
                                        textAlign = TextAlign.Right,
                                        color = if (isHighlighted) OnGoldContainer else MaterialTheme.colorScheme.onSurface
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // Live Class Chat Stream
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    elevation = CardDefaults.cardElevation(2.dp)
                ) {
                    Column(modifier = Modifier.padding(14.dp)) {
                        Text(
                            text = "Classroom Discussion & Feedback",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold
                        )
                        Spacer(modifier = Modifier.height(8.dp))

                        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            state.chatMessages.takeLast(4).forEach { (sender, msg) ->
                                val isMe = sender == "You"
                                Surface(
                                    shape = RoundedCornerShape(10.dp),
                                    color = if (isMe) EmeraldContainer else MaterialTheme.colorScheme.surfaceVariant,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Column(modifier = Modifier.padding(8.dp)) {
                                        Text(
                                            text = sender,
                                            fontWeight = FontWeight.Bold,
                                            fontSize = 11.sp,
                                            color = if (isMe) EmeraldPrimary else GoldDark
                                        )
                                        Text(text = msg, fontSize = 12.sp)
                                    }
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            OutlinedTextField(
                                value = chatInput,
                                onValueChange = { chatInput = it },
                                placeholder = { Text("Ask teacher...", fontSize = 12.sp) },
                                modifier = Modifier
                                    .weight(1f)
                                    .testTag("classroom_chat_input"),
                                shape = RoundedCornerShape(12.dp),
                                singleLine = true
                            )
                            FilledIconButton(
                                onClick = {
                                    viewModel.sendClassChatMessage(chatInput)
                                    chatInput = ""
                                },
                                colors = IconButtonDefaults.filledIconButtonColors(containerColor = EmeraldPrimary),
                                modifier = Modifier.testTag("classroom_chat_send_btn")
                            ) {
                                Icon(Icons.AutoMirrored.Filled.Send, contentDescription = "Send", tint = Color.White)
                            }
                        }
                    }
                }
            }
        }
    }

    // Leave / End Class Confirmation Dialog
    if (showLeaveDialog) {
        AlertDialog(
            onDismissRequest = { showLeaveDialog = false },
            icon = { Icon(Icons.Default.Celebration, contentDescription = null, tint = GoldSecondary) },
            title = { Text("Class Session Completed!") },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Masha'Allah! You attended 30 minutes of live Quran tutoring.")
                    Text("⭐ +20 Stars added to your profile!", fontWeight = FontWeight.Bold, color = GoldDark)
                    Text("Homework assigned by Sheikh Ahmad: Practice Surah Al-Fatihah with Makharij.", fontSize = 12.sp)
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        viewModel.completeClass("demo_class_1")
                        showLeaveDialog = false
                        onLeaveClass()
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldPrimary)
                ) {
                    Text("Return to Dashboard")
                }
            },
            dismissButton = {
                TextButton(onClick = { showLeaveDialog = false }) {
                    Text("Stay in Class")
                }
            }
        )
    }
}
